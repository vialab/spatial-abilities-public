let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("./ValidationError");

let {Validate : ValidateScreen} = require("./Screen");

let {Validate: ValidateDemographic} = require("./Demographics");
let {Validate: ValidateEducation} = require("./Demographics/Education");
let {Validate: ValidateVideoGames} = require("./Demographics/VideoGames");
let {Validate: ValidateVisualArt} = require("./Demographics/VisualArt");
let {Validate: ValidateWorkplaceGraphics} = require("./Demographics/WorkplaceGraphics");
let {Validate: ValidateWorkplaceDrawings} = require("./Demographics/WorkplaceDrawings");

let {Validate: ValidateTest} = require("./Tests");
let {Validate: ValidateOption} = require("./Tests/Option");
let {Validate: ValidateRotation} = require("./Tests/Rotation");
let {Validate: ValidateRotationInstance} = require("./Tests/RotationInstance");

let {Validate: ValidateCompensation} = require("./Compensation");

let {ContainsProperty, IsArray, IsObject} = require("./TypeValidation");
let {IsEmptyString} = require("./GeneralValidation");

let Errors = {
	MISSING_DEMOGRAPHICS: new KeyMissingOrInvalidTypeError(110, "Demographics"),
	MISSING_TESTS: new KeyMissingOrInvalidTypeError(111, "Tests"),
	MISSING_COMPENSATION: new KeyMissingOrInvalidTypeError(112, "Compensation"),
	EMPTY_TASK_ORDER_NAME: new EmptyStringError(113, "TaskOrderName"),
	MISSING_TASK_ORDER_NAME: new KeyMissingOrInvalidTypeError(114, "TaskOrderName"),
	MISSING_SCREEN: new KeyMissingOrInvalidTypeError(115, "Screen"),
	MISSING_TOTAL_TIME: new KeyMissingOrInvalidTypeError(116, "TotalTime"),
};

module.exports = {
	Validate,
	Errors
};

function Validate(model)
{
	let errors = [];

	if (!ContainsProperty(model, "TotalTime", Number))
	{
		errors.push(Errors.MISSING_TOTAL_TIME);
	}

	if (ContainsProperty(model, "TaskOrderName", String))
	{
		if (IsEmptyString(model.TaskOrderName))
		{
			errors.push(Errors.EMPTY_TASK_ORDER_NAME);
		}
	}
	else
	{
		errors.push(Errors.MISSING_TASK_ORDER_NAME);
	}

	if (IsObject(model.Screen))
	{
		let screenErrors = ValidateScreen(model.Screen);
		screenErrors = ErrorMessagePrepend(screenErrors, "(Screen) ");
		errors = errors.concat(screenErrors);
	}
	else
	{
		errors.push(Errors.MISSING_SCREEN);
	}
	
	if (IsObject(model.Demographics))
	{
		let demographics = model.Demographics;
		let demographicErrors = ValidateDemographic(demographics);
		
		if (demographicErrors.length == 0)
		{
			let workplaceGraphicErrors = ValidateWorkplaceGraphics(demographics.WorkplaceGraphics);
			workplaceGraphicErrors = ErrorMessagePrepend(workplaceGraphicErrors, "(Demographics.WorkplaceGraphics) ");

			let workplaceDrawingErrors = ValidateWorkplaceDrawings(demographics.WorkplaceDrawings);
			workplaceDrawingErrors = ErrorMessagePrepend(workplaceDrawingErrors, "(Demographics.WorkplaceDrawings) ");

			let visualArtErrors = ValidateVisualArt(demographics.VisualArt);
			visualArtErrors = ErrorMessagePrepend(visualArtErrors, "(Demographics.VisualArt) ");

			let videoGameErrors = ValidateVideoGames(demographics.VideoGames);
			videoGameErrors = ErrorMessagePrepend(videoGameErrors, "(Demographics.VideoGames) ");
			
			let educationErrors = ValidateArray(ValidateEducation, demographics.Education, "Demographics.Education");

			errors = errors.concat(
				workplaceGraphicErrors,
				workplaceDrawingErrors,
				visualArtErrors,
				videoGameErrors,
				educationErrors
			);
		}
		else
		{
			demographicErrors = ErrorMessagePrepend(demographicErrors, "(Demographics)");
			errors = errors.concat(demographicErrors);
		}
	}
	else
	{
		errors.push(Errors.MISSING_DEMOGRAPHICS);
	}

	if (IsArray(model.Tests))
	{
		let testErrors = ValidateArray(ValidateTest, model.Tests, "Tests");
		
		if (testErrors.length == 0)
		{
			let testPropertyErrors = [];

			for (let i = 0; i < model.Tests.length; i++)
			{
				let test = model.Tests[i];
				let optionErrors = ValidateArray(ValidateOption, test.Options, `Tests[${i}].Options`);
				let rotationErrors = ValidateArray(ValidateRotation, test.Rotations, `Tests[${i}].Rotations`);

				testPropertyErrors = testPropertyErrors.concat(optionErrors, rotationErrors);

				for (let r = 0; r < test.Rotations.length; r++)
				{
					let rotation = test.Rotations[r];
					let instanceErrors = ValidateArray(ValidateRotationInstance, rotation.Instances, `Tests[${i}].Rotations[${r}].Instances`);
					testPropertyErrors = testPropertyErrors.concat(instanceErrors);
				}
			}

			errors = errors.concat(testPropertyErrors);
		}
		else
		{
			errors = errors.concat(testErrors);
		}
	}
	else
	{
		errors.push(Errors.MISSING_TESTS);
	}

	if (IsObject(model.Compensation))
	{
		let compensationErrors = ValidateCompensation(model.Compensation);
		compensationErrors = ErrorMessagePrepend(compensationErrors, "(Compensation) ");
		errors = errors.concat(compensationErrors);
	}
	else
	{
		errors.push(Errors.MISSING_COMPENSATION);
	}

	return errors;
};

function ValidateArray(validateFunction, array, objectKey)
{
	let errors = [];

	for (let i = 0; i < array.length; i++)
	{
		let object = array[i];
		let currentErrors = validateFunction(object);
		currentErrors = ErrorMessagePrepend(currentErrors, `(${objectKey}[${i}]) `);

		errors = errors.concat(currentErrors);
	}

	return errors;
}

function ErrorMessagePrepend(errors, string)
{
	let newErrors = [];

	for (let i = 0; i < errors.length; i++)
	{
		let error = errors[i];
		newErrors.push({
			Code: error.Code,
			Message: string + error.Message
		});
	}

	return newErrors;
}