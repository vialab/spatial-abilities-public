let {Errors, Validate} = require("../../../src/Validation/Tests/Rotation");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Rotation Object Validation", () =>
{
	it("Handles missing Id", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.Id;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_ID);
	});

	it("Handles missing InitialOffset", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.InitialOffset;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_INITIALOFFSET);
	});

	it("Handles missing InitialOffset.x", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.InitialOffset.x;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_INITIALOFFSET_X);
	});

	it("Handles missing InitialOffset.y", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.InitialOffset.y;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_INITIALOFFSET_Y);
	});

	it("Handles missing Instances", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.Instances;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_INSTANCES);
	});
});

function GetObjectInstance()
{
	return ValidSession().Tests[0].Rotations[0];
}