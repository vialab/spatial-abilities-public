let {Errors, Validate} = require("../../src/Validation/Screen");
let {AssertErrror} = require("../Util/AssertError");

let ValidSession = require("../ValidModels/TestSession");

describe("Screen object validation", () =>
{
	it("Handles missing DPI", () =>
	{
		let screen = GetScreen();
		delete screen.Dpi;
		let errors = Validate(screen);
		AssertErrror(errors, Errors.MISSING_DPI);
	});

	it("Handles missing Width", () =>
	{
		let screen = GetScreen();
		delete screen.Width;
		let errors = Validate(screen);
		AssertErrror(errors, Errors.MISSING_WIDTH);
	});

	it("Handles missing Height", () =>
	{
		let screen = GetScreen();
		delete screen.Height;
		let errors = Validate(screen);
		AssertErrror(errors, Errors.MISSING_HEIGHT);
	});
});

function GetScreen()
{
	return ValidSession().Screen;
}