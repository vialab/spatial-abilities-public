let {
	ValidationError,
	KeyMissingOrInvalidTypeError,
	EmptyStringError
} = require("../ValidationError");

let {ContainsProperty} = require("../TypeValidation");

let Errors = {
	MISSING_ID: new KeyMissingOrInvalidTypeError(80, "Id"),
	MISSING_INITIALOFFSET: new KeyMissingOrInvalidTypeError(82, "InitialOffset"),
	MISSING_INSTANCES: new KeyMissingOrInvalidTypeError(83, "Rotations"),
	MISSING_INITIALOFFSET_X: new KeyMissingOrInvalidTypeError(84, "InitialOffset.x"),
	MISSING_INITIALOFFSET_Y: new KeyMissingOrInvalidTypeError(85, "InitialOffset.y") 
};

function Validate(rotation)
{
	let errors = [];

	if (!ContainsProperty(rotation, "Id", Number))
	{
		errors.push(Errors.MISSING_ID);
	}

	if (ContainsProperty(rotation, "InitialOffset", Object))
	{
		if (!ContainsProperty(rotation.InitialOffset, "x", Number))
		{
			errors.push(Errors.MISSING_INITIALOFFSET_X);
		}

		if (!ContainsProperty(rotation.InitialOffset, "y", Number))
		{
			errors.push(Errors.MISSING_INITIALOFFSET_Y);
		}
	}
	else
	{
		errors.push(Errors.MISSING_INITIALOFFSET);
	}

	if (!ContainsProperty(rotation, "Instances", Array))
	{
		errors.push(Errors.MISSING_INSTANCES);
	}

	return errors;
}

module.exports = {
	Errors,
	Validate
};