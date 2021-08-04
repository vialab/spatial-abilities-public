let {Errors, Validate} = require("../../../src/Validation/Demographics/VisualArt");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Demographic.VisualArt object validation", () =>
{
	it("Handles missing TimeSpent", () =>
	{
		let obj = GetVisualArtObject();
		delete obj.TimeSpent;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_TIMESPENT);
	});

	it("Handles TimeSpent out of range (lower bound)", () =>
	{
		let obj = GetVisualArtObject();
		obj.TimeSpent = -1;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_TIMESPENT);
	});

	it("Handles TimeSpent out of range (upper bound)", () =>
	{
		let obj = GetVisualArtObject();
		obj.TimeSpent = 6;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_TIMESPENT);
	});
	
	it("Handles missing Description", () =>
	{
		let obj = GetVisualArtObject();
		delete obj.Description;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_DESCRIPTION);
	});
});

function GetVisualArtObject()
{
	return ValidSession().Demographics.VisualArt;
}