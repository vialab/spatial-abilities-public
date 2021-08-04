module.exports = {
	ContainsProperty,
	IsOfType,
	IsObject,
	IsArray
};

function ContainsProperty(obj, key, type)
{
	return IsOfType(obj[key], type);
}

function IsOfType(obj, type)
{
	if (type == Object)
		return IsObject(obj);
	if (type == Array)
		return IsArray(obj);
	if (type == Boolean)
		return typeof(obj) == "boolean"
	if (type == String)
		return typeof(obj) == "string";
	if (type == Number)
		return typeof(obj) == "number";
}

function IsObject(obj)
{
	return obj instanceof Object && !(obj instanceof Array)
}

function IsArray(obj)
{
	return obj instanceof Object && obj instanceof Array;
}