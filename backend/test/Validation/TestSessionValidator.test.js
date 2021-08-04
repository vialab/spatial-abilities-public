let {Errors, Validate} = require("../../src/Validation/TestSessionValidator");
let {AssertErrror} = require("../Util/AssertError");

let ValidSession = require("../ValidModels/TestSession");

describe("Test Session object validation", () =>
{
	it("Handles missing TotalTime", () =>
	{
		let session = GetSession();
		delete session.TotalTime;
		let errors = Validate(session);
		AssertErrror(errors, Errors.MISSING_TOTAL_TIME);
	});

	it("Handles missing TaskOrderName", () =>
	{
		let session = GetSession();
		delete session.TaskOrderName;
		let errors = Validate(session);
		AssertErrror(errors, Errors.MISSING_TASK_ORDER_NAME);
	});

	it("Handles empty TaskOrderName", () =>
	{
		let session = GetSession();
		session.TaskOrderName = "";
		let errors = Validate(session);
		AssertErrror(errors, Errors.EMPTY_TASK_ORDER_NAME);
	});

	it("Handles missing Screen", () =>
	{
		let session = GetSession();
		delete session.Screen;
		let errors = Validate(session);
		AssertErrror(errors, Errors.MISSING_SCREEN);
	});

	it("Handles missing Demographics", () =>
	{
		let session = GetSession();
		delete session.Demographics;
		let errors = Validate(session);
		AssertErrror(errors, Errors.MISSING_DEMOGRAPHICS);
	});

	it("Handles missing Tests", () =>
	{
		let session = GetSession();
		delete session.Tests;
		let errors = Validate(session);
		AssertErrror(errors, Errors.MISSING_TESTS);
	});

	it("Handles missing Compensation", () =>
	{
		let session = GetSession();
		delete session.Compensation;
		let errors = Validate(session);
		AssertErrror(errors, Errors.MISSING_COMPENSATION);
	});
});

function GetSession()
{
	return ValidSession();
}