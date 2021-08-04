let {PgPool: Pool} = require("./ConnectionPool");
let uuid = require("uuid");

module.exports = {
	Insert,
	InsertFailedValidation
};

const MAX_ID = 999999;
const MIN_ID = 100000;

async function Insert(session)
{
	let compensation = CompensationToTable(session.Compensation);
	let demographic = DemographicToTable(session.Demographics);
	
	let education = [];
	for (let i = 0; i < session.Demographics.Education.length; i++)
	{
		let entry = EducationToTable(session.Demographics.Education[i]);
		education.push(entry);
	}

	let tests = [];
	for (let i = 0; i < session.Tests.length; i++)
	{
		let entry = TestToTable(session.Tests[i]);
		tests.push(entry);
	}

	const connection = await Pool.connect();
	await connection.query("BEGIN");

	try
	{
		await connection.query("LOCK TABLE ClaimedIds IN ACCESS EXCLUSIVE MODE;");
		
		await InsertCompensation(connection, session.Compensation);
		let sessionId = await GenerateSessionId(connection);

		let concurrentInserts = [];

		await connection.query(
			"INSERT INTO TestSessions(Id, TaskOrderName, ScreenWidth, ScreenHeight, ScreenDpi, TotalTime) "
			+"VALUES ($1, $2, $3, $4, $5, $6);",
			[
				sessionId,
				session.TaskOrderName,
				session.Screen.Width,
				session.Screen.Height,
				session.Screen.Dpi,
				session.TotalTime
			]
		);

		// concurrentInserts.push(
			await connection.query(
			"INSERT INTO DemographicInformation "
			+ "(SessionId, FieldOfStudy, WorkplaceGraphicsImportance, WorkplaceGraphicsDescription, "
			+ "WorkplaceDrawingsImportance, WorkplaceDrawingsDescription, VisualArtTimeSpent, "
			+ "VisualArtDescription, VideoGamesTimeSpent, VideoGamesDescription, Age, Gender, IsWorkplaceDrawingsUsed) "
			+ "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
			[
				sessionId,
				demographic.FieldOfStudy,
				demographic.WorkplaceGraphicsImportance,
				demographic.WorkplaceGraphicsDescription,
				demographic.WorkplaceDrawingsImportance,
				demographic.WorkplaceDrawingsDescription,
				demographic.VisualArtTimeSpent,
				demographic.VisualArtDescription,
				demographic.VideoGamesTimeSpent,
				demographic.VideoGamesDescription,
				demographic.Age,
				demographic.Gender,
				demographic.IsWorkplaceDrawingsUsed
			]
		// )
		);
		
		for (let i = 0; i < education.length; i++)
		{
			let entry = education[i];
			
			// concurrentInserts.push(
				await connection.query(
				"INSERT INTO EducationHistory "
				+"(SessionId, Degree, Specialty, IsCompleted, Years) "
				+"VALUES ($1, $2, $3, $4, $5);",
				[
					sessionId,
					entry.Degree,
					entry.Specialty,
					entry.IsCompleted,
					entry.Years
				]
			// )
			);
		}

		for (let t = 0; t < tests.length; t++)
		{
			let test = tests[t];

			let result = await connection.query(
				"INSERT INTO Tests (SessionId, Type, Duration, SortOrder, UserConfidence, Metadata, TechniquesUsed) "
				+ "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING Id;",
				[
					sessionId,
					test.Type,
					test.Duration,
					t,
					test.UserConfidence,
					test.Metadata,
					test.TechniquesUsed
				]
			);
			let testId = result.rows[0].id;

			for (let o = 0; o < test.Options.length; o++)
			{
				let option = test.Options[o];
				
				// concurrentInserts.push(
					await connection.query(
					"INSERT INTO Options (TestId, Name, SelectedState, CorrectState) "
					+ "VALUES ($1, $2, $3, $4);",
					[
						testId,
						option.Name,
						option.SelectedState,
						option.CorrectState
					]
				// )
				);
			}

			for (let r = 0; r < test.Rotations.length; r++)
			{
				let rotation = test.Rotations[r];

				// concurrentInserts.push(
					await connection.query(
					"INSERT INTO Rotations (TestId, InteractionNumber, SortIndex, "
					+ "DeltaTime, InitialOffsetX, InitialOffsetY, RotationX, RotationY) "
					+ "VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
					[
						testId,
						rotation.InteractionNumber,
						rotation.SortIndex,
						rotation.DeltaTime,
						rotation.InitialOffsetX,
						rotation.InitialOffsetY,
						rotation.RotationX,
						rotation.RotationY
					]
				// )
				);
			}
		}

		// await Promise.all(concurrentInserts);
		await connection.query("COMMIT");
	}
	catch (ex)
	{
		await connection.query("ROLLBACK");
		throw ex;
	}
	finally
	{
		connection.release();
	}
}

async function GenerateSessionId(connection)
{
	let id = Math.round(Math.random() * (MAX_ID-MIN_ID) + MIN_ID);
	let exists = await connection.query("SELECT Id FROM ClaimedIds WHERE Id=$1", [id]);
	
	if (exists.rows.length)
		return await GenerateSessionId(connection);
	else
		await connection.query("INSERT INTO ClaimedIds(Id) VALUES ($1)", [id]);
	
	return id;
}

function DemographicToTable(demographic)
{
	return {
		SessionId: 0,

		FieldOfStudy: demographic.FieldOfStudy,

		WorkplaceGraphicsImportance: demographic.WorkplaceGraphics.Importance,
		WorkplaceGraphicsDescription: demographic.WorkplaceGraphics.Description,

		WorkplaceDrawingsImportance: demographic.WorkplaceDrawings.Importance,
		WorkplaceDrawingsDescription: demographic.WorkplaceDrawings.Description,

		VisualArtTimeSpent: demographic.VisualArt.TimeSpent,
		VisualArtDescription: demographic.VisualArt.Description,

		VideoGamesTimeSpent: demographic.VideoGames.TimeSpent,
		VideoGamesDescription: demographic.VideoGames.Description,
		
		Age: demographic.Age,
		Gender: demographic.Gender,

		IsWorkplaceDrawingsUsed: demographic.IsWorkplaceDrawingsUsed,
	};
}

function EducationToTable(education)
{
	return {
		SurveyId: 0,
		Degree: education.Degree,
		Specialty: education.Specialty,
		IsCompleted: education.IsCompleted,
		Years: education.Years
	};
}

function TestToTable(test)
{
	let options = [];
	let rotations = [];

	for (let i = 0; i < test.Options.length; i++)
		options.push(OptionToTable(test.Options[i]));
	for (let i = 0; i < test.Rotations.length; i++)
		rotations = rotations.concat(RotationToTable(test.Rotations[i]));

	return {
		Type: test.Type,
		Duration: test.Duration,
		UserConfidence: test.UserConfidence,
		Metadata: JSON.stringify(test.Metadata),
		Options: options,
		Rotations: rotations,
		TechniquesUsed: test.TechniquesUsed
	};
}

function OptionToTable(option)
{
	return {
		Name: option.Name,
		SelectedState: option.SelectedState,
		CorrectState: option.CorrectState
	};
}

function RotationToTable(rotation)
{
	let rotations = [];

	for (let i = 0; i < rotation.Instances.length; i++)
	{
		let instance = rotation.Instances[0];

		rotations.push({
			InteractionNumber: rotation.Id,
			SortIndex: i,
			DeltaTime: instance.DeltaTime,
			InitialOffsetX: rotation.InitialOffset.x,
			InitialOffsetY: rotation.InitialOffset.y,
			RotationX: instance.x,
			RotationY: instance.y
		});
	}

	return rotations;
}

async function InsertFailedValidation(session, validationErrors)
{
	const connection = await Pool.connect();
	await connection.query("BEGIN");

	try
	{
		await InsertCompensation(connection, session.Compensation);

		let insertedSubmission = await connection.query(
			"INSERT INTO FailedSubmissions(TestSession) VALUES ($1) RETURNING Id;",
			[
				JSON.stringify({
					Tests: session.Tests,
					Demographics: session.Demographics,
					Screen: session.Screen,
					TaskOrderName: session.TaskOrderName,
				})
			]
		);

		let submissionId = insertedSubmission.rows[0].id;
		let errorInserts = [];

		for (let i = 0; i < validationErrors.length; i++)
		{
			let error = validationErrors[i];

			let values = [
				submissionId,
				error.Code,
				error.Message
			];

			errorInserts.push(connection.query(
				"INSERT INTO FailedSubmissionErrors(SubmissionId, ErrorCode, Message) "
				+ "VALUES($1, $2, $3);",
				values
			));
		}

		await Promise.all(errorInserts);
		await connection.query("COMMIT");
	}
	catch (ex)
	{
		await connection.query("ROLLBACK");
		throw ex;
	}
	finally
	{
		connection.release();
	}
}

async function InsertCompensation(connection, compensation)
{
	let tableData = CompensationToTable(compensation);

	return await connection.query(
		"INSERT INTO Compensation(Email, Name, Country) "
		+ "VALUES($1, $2, $3) RETURNING *;",
		[
			tableData.Email,
			tableData.Name,
			tableData.Country
		]
	);
}

function CompensationToTable(compensation)
{
	return {
		Name: compensation.Name,
		Email: compensation.Email,
		Country: compensation.Country
	};
}