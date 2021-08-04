let {assert} = require("chai");

module.exports = {
	AssertErrror,
};

function AssertErrror(errorList, expectedError)
{
	let messages = BuildMessagesString(errorList);
	assert.equal(errorList.length, 1, "Error in test: Validation should return exactly one error.\n\tErrors returned:\n\t" + messages);
	assert.equal(errorList[0], expectedError, "Wrong error type returned");
}

function BuildMessagesString(errorList)
{
	let out = "";

	for (let i = 0; i < errorList.length; i++)
	{
		out += errorList[i].Message + "\n\t";
	}

	return out;
}