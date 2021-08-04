let {Errors, Validate} = require("../../../src/Validation/Demographics/WorkplaceDrawings");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Demographic.WorkplaceDrawings object validation", () =>
{
	it("Handles missing Importance", () =>
	{
		let obj = GetWorkplaceDrawingsObject();
		delete obj.Importance;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_IMPORTANCE);
	});

	it("Handles Importance out of range (lower bound)", () =>
	{
		let obj = GetWorkplaceDrawingsObject();
		obj.Importance = -1;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_IMPORTANCE);
	});

	it("Handles Importance out of range (upper bound)", () =>
	{
		let obj = GetWorkplaceDrawingsObject();
		obj.Importance = 6;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_IMPORTANCE);
	});
	
	it("Handles missing Description", () =>
	{
		let obj = GetWorkplaceDrawingsObject();
		delete obj.Description;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_DESCRIPTION);
	});
});

function GetWorkplaceDrawingsObject()
{
	return ValidSession().Demographics.WorkplaceDrawings;
}