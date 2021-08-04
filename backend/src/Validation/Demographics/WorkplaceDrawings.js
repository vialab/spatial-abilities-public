let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");

const MIN_IMPORTANCE = 0;
const MAX_IMPORTANCE = 5;

let Errors = {
	MISSING_IMPORTANCE: new KeyMissingOrInvalidTypeError(40, "Importance"),
	MISSING_DESCRIPTION: new KeyMissingOrInvalidTypeError(41, "Description"),

	OUT_OF_RANGE_IMPORTANCE: new ValidationError(42, `Importance must be between ${MIN_IMPORTANCE} and ${MAX_IMPORTANCE}`),
};

function Validate(obj)
{
	let errors = [];

	if (ContainsProperty(obj, "Importance", Number))
	{
		if (obj.Importance > MAX_IMPORTANCE || obj.Importance < MIN_IMPORTANCE)
		{
			errors.push(Errors.OUT_OF_RANGE_IMPORTANCE);
		}
	}
	else
	{
		errors.push(Errors.MISSING_IMPORTANCE);
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