let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");
let {IsEmptyString} = require("../GeneralValidation");

let Errors = {
	MISSING_DEGREE: new KeyMissingOrInvalidTypeError(0, "Degree"),
	MISSING_SPECIALTY: new KeyMissingOrInvalidTypeError(1, "Specialty"),
	MISSING_ISCOMPLETE: new KeyMissingOrInvalidTypeError(2, "IsCompleted"),
	MISSING_YEARS: new ValidationError(3, `Key "Years" is required when IsComplete is false`),

	EMPTY_DEGREE: new EmptyStringError(4, "Degree"),
	EMPTY_SPECIALTY: new EmptyStringError(5, "Specialty")
};

function Validate(obj)
{
	let errors = [];

	if (ContainsProperty(obj, "Degree", String))
	{
		if (IsEmptyString(obj.Degree))
		{
			errors.push(Errors.EMPTY_DEGREE);
		}
	}
	else
	{
		errors.push(Errors.MISSING_DEGREE);
	}
	
	if (ContainsProperty(obj, "Specialty", String))
	{
		if (IsEmptyString(obj.Specialty))
		{
			errors.push(Errors.EMPTY_SPECIALTY);
		}
	}
	else
	{
		errors.push(Errors.MISSING_SPECIALTY);
	}
	
	if (ContainsProperty(obj, "IsCompleted", Boolean))
	{
		if (!obj.IsCompleted && !ContainsProperty(obj, "Years", Number))
		{
			errors.push(Errors.MISSING_YEARS);
		}
	}
	else
	{
		errors.push(Errors.MISSING_ISCOMPLETE);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};