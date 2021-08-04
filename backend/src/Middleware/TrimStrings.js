let {IsObject, IsArray, IsOfType} = require("../Validation/TypeValidation");
let SqlString = require("sqlstring");

module.exports = (req, res, next) =>
{
	TrimStrings(req, "body");
	next();
}

function TrimStrings(parent, key)
{
	let obj = parent[key];

	if (IsOfType(obj, String))
	{
		parent[key] = obj.trim();
	}
	else if (IsObject(obj))
	{
		for (let index in obj)
		{
			TrimStrings(obj, index);
		}
	}
	else if (IsArray(obj))
	{
		for (let i = 0; i < obj.length; i++)
		{
			TrimStrings(obj, i);
		}
	}
}

