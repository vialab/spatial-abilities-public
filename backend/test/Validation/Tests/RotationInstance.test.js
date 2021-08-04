let {Errors, Validate} = require("../../../src/Validation/Tests/RotationInstance");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Rotation Instance Object Validation", () =>
{
	it("Handles missing DeltaTime", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.DeltaTime;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_DELTATIME);
	});

	it("Handles missing x", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.x;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_X);
	});

	it("Handles missing y", () =>
	{
		let rotation = GetObjectInstance();
		delete rotation.y;
		let errors = Validate(rotation);
		AssertErrror(errors, Errors.MISSING_Y);
	});
});

function GetObjectInstance()
{
	return ValidSession().Tests[0].Rotations[0].Instances[0];
}