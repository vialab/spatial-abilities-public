let {
	ContainsProperty,
	IsOfType,
	IsObject,
	IsArray
} = require("../../src/Validation/TypeValidation");

let {assert} = require("chai");

describe("Type validation", () =>
{
	describe("Object checking", () =>
	{
		it("Detects objects", () =>
		{
			assert.isTrue(IsObject({}))
		});

		it("Detects non objects", () =>
		{
			assert.isFalse(IsObject("wew"));
		});

		it("Doesn't confuse arrays for objects", () =>
		{
			assert.isFalse(IsObject([]));
		});

		
	});

	describe("Object property checks", () =>
	{
		let testObject = {key: 0};

		it("Checks object keys", () =>
		{
			assert.isTrue(ContainsProperty(testObject, "key", Number));
		});

		it("Detects missing keys", () =>
		{
			assert.isFalse(ContainsProperty(testObject, "missingKey", Number));
		});

		it("Detects wrong typed keys", () =>
		{
			assert.isFalse(ContainsProperty(testObject, "key", String));
		})
	});

	describe("Array checking", () =>
	{
		it("Detects arrays", () =>
		{
			assert.isTrue(IsArray([]));
		});

		it("Detects non arrays", () =>
		{
			assert.isFalse(IsArray(""));
		});
	});

	describe("type checking", () =>
	{
		it("Detects objects", () =>
		{
			assert.isTrue(IsOfType({}, Object));
		});
		it("Detects non-objects", () =>
		{
			assert.isFalse(IsOfType(0, Object));
		});

		it("Detects arrays", () =>
		{
			assert.isTrue(IsOfType([], Array));
		});
		it("Detects non-arrays", () =>
		{
			assert.isFalse(IsOfType(0, Array));
		});

		it("Detects booleans", () =>
		{
			assert.isTrue(IsOfType(true, Boolean));
		});
		it("Detects non-booleans", () =>
		{
			assert.isFalse(IsOfType(0, Boolean));
		});

		it("Detects strings", () =>
		{
			assert.isTrue(IsOfType("", String));
		});
		it("Detects non-strings", () =>
		{
			assert.isFalse(IsOfType(0, String));
		});

		it("Detects numbers", () =>
		{
			assert.isTrue(IsOfType(0, Number));
		});
		it("Detects non-numbers", () =>
		{
			assert.isFalse(IsOfType("", Number));
		});
	});
});