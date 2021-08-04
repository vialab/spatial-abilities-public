let allErrors = [];

class ValidationError
{
	constructor(code, message)
	{
		this.Code = code;
		this.Message = message;

		allErrors.push(this);
	}
}

ValidationError.All = function All()
{
	return allErrors;
}

class KeyMissingOrInvalidTypeError extends ValidationError
{
	constructor(code, erronousKey)
	{
		super(code, `Missing or invalid type for key "${erronousKey}"`);
	}
}

class EmptyStringError extends ValidationError
{
	constructor(code, erronousKey)
	{
		super(code, `Value for "${erronousKey}" cannot be empty or contain only whitespace`);
	}
}

module.exports = {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
};