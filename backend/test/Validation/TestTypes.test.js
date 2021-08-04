let TestTypes = require("../../src/Constants/TestTypes");
let {IsValidTestType} = require("../../src/Validation/TestTypeValidation");
let {assert} = require("chai");

describe("Test Type Validation", () =>
{
	it("Accepts 3d rotation", () =>
	{
		assert.equal(IsValidTestType(TestTypes.OBJECT_ROTATION), true);
	});
	
	it("Accepts paper folding", () =>
	{
		assert.equal(IsValidTestType(TestTypes.PAPER_FOLDING), true);
	});

	it("Accepts card rotation", () =>
	{
		assert.equal(IsValidTestType(TestTypes.CARD_ROTATION), true);
	});
	
	it("Accepts pie chart", () =>
	{
		assert.equal(IsValidTestType(TestTypes.PIE_CHART), true);
	});

	it("Accepts graph", () =>
	{
		assert.equal(IsValidTestType(TestTypes.GRAPH), true);
	});

	it("Accepts scatter plot", () =>
	{
		assert.equal(IsValidTestType(TestTypes.SCATTER_PLOT), true);
	});

	it("Accepts isocontour", () =>
	{
		assert.equal(IsValidTestType(TestTypes.ISOCONTOUR), true);
	});

	it("Rejects non-existent tests", () =>
	{
		assert.equal(IsValidTestType(-1), false);
	});
});