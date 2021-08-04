let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {IsValidTestType} = require("../TestTypeValidation");
let {ContainsProperty} = require("../TypeValidation");

let Errors = {
	MISSING_TYPE: new KeyMissingOrInvalidTypeError(60, "Type"),
	MISSING_DURATION: new KeyMissingOrInvalidTypeError(61, "Duration"),
	MISSING_USERCONFIDENCE: new KeyMissingOrInvalidTypeError(62, "UserConfidence"),
	MISSING_TECHNIQUESUSED: new KeyMissingOrInvalidTypeError(63, "TechniquesUsed"),
	MISSING_METADATA: new KeyMissingOrInvalidTypeError(64, "Metadata"),
	MISSING_OPTIONS: new KeyMissingOrInvalidTypeError(65, "Options"),
	MISSING_ROTATIONS: new KeyMissingOrInvalidTypeError(66, "Rotations"),

	INVALID_TEST_TYPE: new ValidationError(67, `Invalid value for property "Type"`),
	EMPTY_OPTIONS: new ValidationError(68, `Invalid value for property "Options". Empty array not allowed`)
};

function Validate(test)
{
	let errors = [];

	if (ContainsProperty(test, "Type", Number))
	{
		if (!IsValidTestType(test.Type))
		{
			errors.push(Errors.INVALID_TEST_TYPE);
		}
	}
	else
	{
		errors.push(Errors.MISSING_TYPE);
	}

	if (!ContainsProperty(test, "Duration", Number))
	{
		errors.push(Errors.MISSING_DURATION);
	}

	if (!ContainsProperty(test, "UserConfidence", Number))
	{
		errors.push(Errors.MISSING_USERCONFIDENCE);
	}

	if (!ContainsProperty(test, "TechniquesUsed", String))
	{
		errors.push(Errors.MISSING_TECHNIQUESUSED);
	}

	if (!ContainsProperty(test, "Metadata", Object))
	{
		errors.push(Errors.MISSING_METADATA);
	}

	if (ContainsProperty(test, "Options", Array))
	{
		if (test.Options.length == 0)
		{
			errors.push(Errors.EMPTY_OPTIONS);
		}
	}
	else
	{
		errors.push(Errors.MISSING_OPTIONS);
	}

	if (!ContainsProperty(test, "Rotations", Array))
	{
		errors.push(Errors.MISSING_ROTATIONS);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};