let {IsOfType} = require("./TypeValidation");

module.exports = {
	IsEmptyString
};

function IsEmptyString(obj)
{
	return IsOfType(obj, String) && obj.trim().length == 0;
}