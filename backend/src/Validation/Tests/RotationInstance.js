let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");

let Errors = {
	MISSING_DELTATIME: new KeyMissingOrInvalidTypeError(91, "DeltaTime"),
	MISSING_X: new KeyMissingOrInvalidTypeError(92, "x"),
	MISSING_Y: new KeyMissingOrInvalidTypeError(93, "y"),
};

function Validate(rotation)
{
	let errors = [];

	if (!ContainsProperty(rotation, "DeltaTime", Number))
	{
		errors.push(Errors.MISSING_DELTATIME);
	}

	if (!ContainsProperty(rotation, "x", Number))
	{
		errors.push(Errors.MISSING_X);
	}

	if (!ContainsProperty(rotation, "y", Number))
	{
		errors.push(Errors.MISSING_Y);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};