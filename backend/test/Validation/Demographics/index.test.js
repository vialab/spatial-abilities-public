let {Validate, Errors} = require("../../../src/Validation/Demographics");
let {AssertErrror} = require("../../Util/AssertError");

let ValidSession = require("../../ValidModels/TestSession");

describe("Demographic object validation", () =>
{
	it("Handles missing Education", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.Education;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_EDUCATION);
	});

	it("Handles empty Education list", () =>
	{
		let demographic = GetDemographicObject();
		demographic.Education = [];
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.EMPTY_EDUCATION);
	});

	it("Handles missing FieldOfStudy", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.FieldOfStudy;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_FIELDOFSTUDY);
	});

	it("Handles Invalid Field of Study", () =>
	{
		let demographic = GetDemographicObject();
		demographic.FieldOfStudy = -99999;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.INVALID_FIELDOFSTUDY);
	})

	it ("Handles missing WorkplaceGraphics", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.WorkplaceGraphics;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_WORKPLACEGRAPHICS);
	});

	it ("Handles missing WorkplaceDrawings", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.WorkplaceDrawings;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_WORKPLACEDRAWINGS);
	});

	it ("Handles missing VisualArt", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.VisualArt;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_VISUALART);
	});

	it ("Handles missing VideoGames", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.VideoGames;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_VIDEOGAMES);
	});

	it ("Handles missing Age", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.Age;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_AGE);
	});

	it ("Handles missing Gender", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.Gender;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_GENDER);
	});

	it("Handles empty Gender", () =>
	{
		let demographic = GetDemographicObject();
		demographic.Gender = "";
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.EMPTY_GENDER);
	});

	it("Handles missing IsWorkplaceDrawingsUsed", () =>
	{
		let demographic = GetDemographicObject();
		delete demographic.IsWorkplaceDrawingsUsed;
		let errors = Validate(demographic);
		AssertErrror(errors, Errors.MISSING_WORKPLACEDRAWINGSUSED);
	});
});

function GetDemographicObject()
{
	return ValidSession().Demographics;
}