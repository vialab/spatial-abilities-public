let {PgPool: Pool} = require("./ConnectionPool");
let config = require("../../config.json");

module.exports = {
	IsFieldOfStudyFull
};

async function IsFieldOfStudyFull(fieldOfStudyId)
{
	let connection = await Pool.connect();
	let res = await connection.query(
		"SELECT IsFieldOfStudyFull($1, $2);",
		[fieldOfStudyId, config.MaximumPerFieldOfStudy]
	);
	connection.release();

	return res.rows[0].isfieldofstudyfull;
}