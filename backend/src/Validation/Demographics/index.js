let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");
let {IsEmptyString} = require("../GeneralValidation");
let {IsValidFieldOfStudy} = require("../FieldOfStudyValidation");

let Errors = {
	MISSING_EDUCATION: new KeyMissingOrInvalidTypeError(10, "Education"),
	MISSING_WORKPLACEGRAPHICS: new KeyMissingOrInvalidTypeError(11, "WorkplaceGraphics"),
	MISSING_WORKPLACEDRAWINGS: new KeyMissingOrInvalidTypeError(12, "WorkplaceDrawings"),
	MISSING_VISUALART: new KeyMissingOrInvalidTypeError(13, "VisualArt"),
	MISSING_VIDEOGAMES: new KeyMissingOrInvalidTypeError(14, "VideoGames"),
	MISSING_AGE: new KeyMissingOrInvalidTypeError(15, "Age"),
	MISSING_GENDER: new KeyMissingOrInvalidTypeError(16, "Gender"),
	MISSING_FIELDOFSTUDY: new KeyMissingOrInvalidTypeError(19, "FieldOfStudy"),
	INVALID_FIELDOFSTUDY: new ValidationError(-19, `Invalid value for Key "FieldOfStudy"`),
	MISSING_WORKPLACEDRAWINGSUSED: new KeyMissingOrInvalidTypeError(-12, "IsWorkplaceDrawingsUsed"),

	EMPTY_EDUCATION: new ValidationError(17, `Education array cannot be empty`),
	EMPTY_GENDER: new EmptyStringError(18, "Gender"),
};

function Validate(demographic)
{
	let errors = [];

	if (ContainsProperty(demographic, "Education", Array))
	{
		if (demographic.Education.length == 0)
		{
			errors.push(Errors.EMPTY_EDUCATION);
		}
	}
	else
	{
		errors.push(Errors.MISSING_EDUCATION);
	}

	if (ContainsProperty(demographic, "FieldOfStudy", Number))
	{
		if (!IsValidFieldOfStudy(demographic.FieldOfStudy))
		{
			errors.push(Errors.INVALID_FIELDOFSTUDY);
		}
	}
	else
	{
		errors.push(Errors.MISSING_FIELDOFSTUDY);
	}

	if (!ContainsProperty(demographic, "WorkplaceGraphics", Object))
	{
		errors.push(Errors.MISSING_WORKPLACEGRAPHICS);
	}

	if (!ContainsProperty(demographic, "WorkplaceDrawings", Object))
	{
		errors.push(Errors.MISSING_WORKPLACEDRAWINGS);
	}

	if (!ContainsProperty(demographic, "VisualArt", Object))
	{
		errors.push(Errors.MISSING_VISUALART);
	}

	if (!ContainsProperty(demographic, "VideoGames", Object))
	{
		errors.push(Errors.MISSING_VIDEOGAMES);
	}

	if (!ContainsProperty(demographic, "Age", Number))
	{
		errors.push(Errors.MISSING_AGE);
	}

	if (ContainsProperty(demographic, "Gender", String))
	{
		if (IsEmptyString(demographic.Gender))
		{
			errors.push(Errors.EMPTY_GENDER);
		}
	}
	else
	{
		errors.push(Errors.MISSING_GENDER);
	}

	if (!ContainsProperty(demographic, "IsWorkplaceDrawingsUsed", Boolean))
	{
		errors.push(Errors.MISSING_WORKPLACEDRAWINGSUSED);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};