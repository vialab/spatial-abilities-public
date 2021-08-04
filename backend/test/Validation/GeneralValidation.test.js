let {IsEmptyString} = require("../../src/Validation/GeneralValidation");
let {assert} = require("chai");

describe("General Validations", () =>
{
	describe("String Validations", () =>
	{
		it("Identifies empty strings", () =>
		{
			assert.equal(IsEmptyString(""), true);
		});

		it("Identifies non empty strings", () =>
		{
			assert.equal(IsEmptyString("wew"), false);
		});

		it("Ignores leading and trailing whitespace", () =>
		{
			assert.equal(IsEmptyString("     "), true);
		});
	});
});