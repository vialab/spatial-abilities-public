let {ValidationError} = require("../../src/Validation/ValidationError");

describe("Validation Error checks", () =>
{
	it("Contains no duplicate error codes", () =>
	{
		CheckForDuplicates();
	});

	it("Catches duplicate errors", () =>
	{
		let exThrown = false;
		let e1 = new ValidationError(-99999, "Duplicate error 1 for testing");
		let e2 = new ValidationError(-99999, "Duplicate error 2 for testing");
		
		try
		{
			CheckForDuplicates();	
		}
		catch (ex) { exThrown = true; }

		//Clean the errors we just made from the error list
		ValidationError.All().pop();
		ValidationError.All().pop();

		if (!exThrown)
			throw new Error("Duplicate error code not detected. CheckForDuplicates() function in this test file is not working as expected");
	});
});

function CheckForDuplicates()
{
	let allErrors = ValidationError.All();

		for (let currentIndex = 0; currentIndex < allErrors.length; currentIndex++)
		{
			let current = allErrors[currentIndex];

			for (let compareIndex = currentIndex+1; compareIndex < allErrors.length; compareIndex++)
			{
				let compare = allErrors[compareIndex];

				if (current.Code == compare.Code)
				{
					throw new Error(
						`Duplicate error code: ${current.Code}\n`
						+ "Error Messages:\n"
						+ `"${current.Message}"\n`
						+ `"${compare.Message}"\n`
					);
				}
			}
		}
}