let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("./ValidationError");

let {ContainsProperty, IsArray, IsObject} = require("./TypeValidation");
let {IsEmptyString} = require("./GeneralValidation");

let Errors = {
	MISSING_WIDTH: new KeyMissingOrInvalidTypeError(1100, "Width"),
	MISSING_HEIGHT: new KeyMissingOrInvalidTypeError(1101, "Height"),
	MISSING_DPI: new KeyMissingOrInvalidTypeError("DPI"),
};

module.exports = {
	Validate,
	Errors
};

function Validate(screen)
{
	let errors = [];

	if (!ContainsProperty(screen, "Width", Number))
	{
		errors.push(Errors.MISSING_WIDTH);
	}

	if (!ContainsProperty(screen, "Height", Number))
	{
		errors.push(Errors.MISSING_HEIGHT);
	}

	if (!ContainsProperty(screen, "Dpi", Number))
	{
		errors.push(Errors.MISSING_DPI);
	}

	return errors;
}