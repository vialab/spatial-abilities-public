let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");
let {IsEmptyString} = require("../GeneralValidation");

let Errors = {
	MISSING_SELECTEDSTATE: new KeyMissingOrInvalidTypeError(70, "SelectedState"),
	MISSING_CORRECTSTATE: new KeyMissingOrInvalidTypeError(71, "CorrectState"),
	MISSING_NAME: new KeyMissingOrInvalidTypeError(72, "Name"),
	EMPTY_NAME: new EmptyStringError(73, "Name"),
};

function Validate(option)
{
	let errors = [];

	if (!ContainsProperty(option, "SelectedState", Number))
	{
		errors.push(Errors.MISSING_SELECTEDSTATE);
	}

	if (!ContainsProperty(option, "CorrectState", Number))
	{
		errors.push(Errors.MISSING_CORRECTSTATE);
	}

	if (ContainsProperty(option, "Name", String))
	{
		if (IsEmptyString(option.Name))
		{
			errors.push(Errors.EMPTY_NAME);
		}
	}
	else
	{
		errors.push(Errors.MISSING_NAME);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};