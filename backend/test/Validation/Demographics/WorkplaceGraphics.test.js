let {Errors, Validate} = require("../../../src/Validation/Demographics/WorkplaceGraphics");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Demographic.WorkplaceGraphics object validation", () =>
{
	it("Handles missing Importance", () =>
	{
		let obj = GetWorkplaceGraphicsObject();
		delete obj.Importance;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_IMPORTANCE);
	});

	it("Handles Importance out of range (lower bound)", () =>
	{
		let obj = GetWorkplaceGraphicsObject();
		obj.Importance = -1;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_IMPORTANCE);
	});

	it("Handles Importance out of range (upper bound)", () =>
	{
		let obj = GetWorkplaceGraphicsObject();
		obj.Importance = 6;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_IMPORTANCE);
	});
	
	it("Handles missing Description", () =>
	{
		let obj = GetWorkplaceGraphicsObject();
		delete obj.Description;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_DESCRIPTION);
	});
});

function GetWorkplaceGraphicsObject()
{
	return ValidSession().Demographics.WorkplaceGraphics;
}