let Types = require("../Constants/TestTypes");
let {IsOfType} = require("./TypeValidation"); 

module.exports = {
	IsValidTestType
};

function IsValidTestType(type)
{
	let typeCorrect = IsOfType(type, Number);
	let typeExists = false;

	for (let i in Types)
	{
		typeExists = Types[i] == type;
		if (typeExists) break;
	}

	return typeCorrect && typeExists;
};