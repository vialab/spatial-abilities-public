let {Errors, Validate} = require("../../../src/Validation/Tests/Option");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Option Object Validation", () =>
{
	it("Handles missing SelectedState", () =>
	{
		let option = GetOptionInstance();
		delete option.SelectedState;
		let errors = Validate(option);
		AssertErrror(errors, Errors.MISSING_SELECTEDSTATE);
	});

	it("Handles missing CorrectState", () =>
	{
		let option = GetOptionInstance();
		delete option.CorrectState;
		let errors = Validate(option);
		AssertErrror(errors, Errors.MISSING_CORRECTSTATE);
	});

	it("Handles missing Name", () =>
	{
		let option = GetOptionInstance();
		delete option.Name;
		let errors = Validate(option);
		AssertErrror(errors, Errors.MISSING_NAME);
	});

	it("Handles empty Name", () =>
	{
		let option = GetOptionInstance();
		option.Name = "";
		let errors = Validate(option);
		AssertErrror(errors, Errors.EMPTY_NAME);
	});
});

function GetOptionInstance()
{
	return ValidSession().Tests[0].Options[0];
}