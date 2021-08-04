let Types = require("../Constants/FieldsOfStudy");
let {IsOfType} = require("./TypeValidation"); 

module.exports = {
	IsValidFieldOfStudy
};

function IsValidFieldOfStudy(type)
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