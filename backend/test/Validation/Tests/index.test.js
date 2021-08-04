let {Errors, Validate} = require("../../../src/Validation/Tests");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Test Object Validation", () =>
{
	it("Handles missing Type", () =>
	{
		let test = GetTestInstance();
		delete test.Type;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_TYPE);
	});

	it("Handles missing Duration", () =>
	{
		let test = GetTestInstance();
		delete test.Duration;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_DURATION);
	});

	it("Handles missing UserConfidence", () =>
	{
		let test = GetTestInstance();
		delete test.UserConfidence;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_USERCONFIDENCE);
	});

	it("Handles missing TechniquesUsed", () =>
	{
		let test = GetTestInstance();
		delete test.TechniquesUsed;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_TECHNIQUESUSED);
	});

	it("Handles missing Metadata", () =>
	{
		let test = GetTestInstance();
		delete test.Metadata;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_METADATA);
	});

	it("Handles missing Options", () =>
	{
		let test = GetTestInstance();
		delete test.Options;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_OPTIONS);
	});

	it("Handles empty Options", () =>
	{
		let test = GetTestInstance();
		test.Options = [];
		let errors = Validate(test);
		AssertErrror(errors, Errors.EMPTY_OPTIONS);
	});

	it ("Handles missing Rotations", () =>
	{
		let test = GetTestInstance();
		delete test.Rotations;
		let errors = Validate(test);
		AssertErrror(errors, Errors.MISSING_ROTATIONS);
	});
});

function GetTestInstance()
{
	return ValidSession().Tests[0];
}