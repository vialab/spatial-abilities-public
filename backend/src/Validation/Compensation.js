let EmailValidator = require("email-validator");

let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("./ValidationError");

let {ContainsProperty} = require("./TypeValidation");
let {IsEmptyString} = require("./GeneralValidation");

let Errors = {
	MISSING_NAME: new KeyMissingOrInvalidTypeError(100, "Name"),
	MISSING_EMAIL: new KeyMissingOrInvalidTypeError(101, "Email"),
	MISSING_COUNTRY: new KeyMissingOrInvalidTypeError(102, "Country"),

	EMPTY_NAME: new EmptyStringError(104, "Name"),
	EMPTY_COUNTRY: new EmptyStringError(106, "Country"),

	MALFORMED_EMAIL: new ValidationError(107, `Invalid email format for key "email"`),

};

function Validate(compensation)
{
	let errors = [];

	if (ContainsProperty(compensation, "Name", String))
	{
		if (IsEmptyString(compensation.Name))
		{
			errors.push(Errors.EMPTY_NAME);
		}
	}
	else
	{
		errors.push(Errors.MISSING_NAME);
	}

	if (ContainsProperty(compensation, "Country", String))
	{
		if (IsEmptyString(compensation.Country))
		{
			errors.push(Errors.EMPTY_COUNTRY);
		}
	}
	else
	{
		errors.push(Errors.MISSING_COUNTRY);
	}

	if (!ContainsProperty(compensation, "Email", String))
	{
		errors.push(Errors.MISSING_EMAIL);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};