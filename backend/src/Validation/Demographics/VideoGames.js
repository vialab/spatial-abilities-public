let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");
let {IsEmptyString} = require("../GeneralValidation");

const MIN_TIMESPENT = 0;
const MAX_TIMESPENT = 5;

let Errors = {
	MISSING_TIMESPENT: new KeyMissingOrInvalidTypeError(20, "TimeSpent"),
	MISSING_DESCRIPTION: new KeyMissingOrInvalidTypeError(21, "Description"),

	OUT_OF_RANGE_TIMESPENT: new ValidationError(22, `TimeSpent must be between ${MIN_TIMESPENT} and ${MAX_TIMESPENT}`),
};

function Validate(obj)
{
	let errors = [];

	if (ContainsProperty(obj, "TimeSpent", Number))
	{
		if (obj.TimeSpent > MAX_TIMESPENT || obj.TimeSpent < MIN_TIMESPENT)
		{
			errors.push(Errors.OUT_OF_RANGE_TIMESPENT);
		}
	}
	else
	{
		errors.push(Errors.MISSING_TIMESPENT);
	}

	if (!ContainsProperty(obj, "Description", String))
	{
		errors.push(Errors.MISSING_DESCRIPTION);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};