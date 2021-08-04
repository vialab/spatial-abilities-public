let {Errors, Validate} = require("../../../src/Validation/Demographics/Education");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Education object validation", () =>
{
	it("Handles missing Degree prop", () =>
	{
		let entry = GetEducationObject();
		delete entry.Degree;
		let errors = Validate(entry);
		AssertErrror(errors, Errors.MISSING_DEGREE);
	});

	it("Handles empty Degree", () =>
	{
		let entry = GetEducationObject();
		entry.Degree = "";
		let errors = Validate(entry);
		AssertErrror(errors, Errors.EMPTY_DEGREE);
	});

	it("Handles missing Specialty prop", () =>
	{
		let entry = GetEducationObject();
		delete entry.Specialty;
		let errors = Validate(entry);
		AssertErrror(errors, Errors.MISSING_SPECIALTY);
	});

	it("Handles empty Specialty prop", () =>
	{
		let entry = GetEducationObject();
		entry.Specialty = "";
		let errors = Validate(entry);
		AssertErrror(errors, Errors.EMPTY_SPECIALTY);
	});

	it("Handles missing IsCompleted prop", () =>
	{
		let entry = GetEducationObject();
		delete entry.IsCompleted;
		let errors = Validate(entry);
		AssertErrror(errors, Errors.MISSING_ISCOMPLETE);
	});

	it("Handles missing Years prop when IsComplete is false", () =>
	{
		let entry = GetEducationObject();
		entry.IsCompleted = false;
		delete entry.Years;
		let errors = Validate(entry);
		AssertErrror(errors, Errors.MISSING_YEARS);
	});
});

function GetEducationObject()
{
	return ValidSession().Demographics.Education[0];
}