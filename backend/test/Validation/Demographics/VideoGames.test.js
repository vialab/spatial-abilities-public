let {Errors, Validate} = require("../../../src/Validation/Demographics/VideoGames");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Demographic.VideoGames object validation", () =>
{
	it("Handles missing TimeSpent", () =>
	{
		let obj = GetVideoGamesObject();
		delete obj.TimeSpent;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_TIMESPENT);
	});

	it("Handles TimeSpent out of range (lower bound)", () =>
	{
		let obj = GetVideoGamesObject();
		obj.TimeSpent = -1;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_TIMESPENT);
	});

	it("Handles TimeSpent out of range (upper bound)", () =>
	{
		let obj = GetVideoGamesObject();
		obj.TimeSpent = 6;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.OUT_OF_RANGE_TIMESPENT);
	});
	
	it("Handles missing Description", () =>
	{
		let obj = GetVideoGamesObject();
		delete obj.Description;
		let errors = Validate(obj);
		AssertErrror(errors, Errors.MISSING_DESCRIPTION);
	});
});

function GetVideoGamesObject()
{
	return ValidSession().Demographics.VideoGames;
}