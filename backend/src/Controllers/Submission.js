let Path = require("path");
let uuid = require("uuid");
let Config = require("../../config.json");
let {Insert, InsertFailedValidation} = require("../Database/TestSession");
let {constants: fsConstants} = require("fs");
let fsp = require("fs.promises");

module.exports = {
	Submit
}

async function Submit(req, res, next)
{
	let errorsOccurred = false;

	if (req.errors && req.errors.length)
	{
		errorsOccurred = true;
	}
	else
	{
		try
		{
			await Insert(req.body);
		}
		catch (err)
		{
			console.error(err);
			errorsOccurred = true;
		}
	}

	if (errorsOccurred)
	{
		await DumpErronousSession(req.body, req.errors);
	}

	res.send({errors: []});
}

async function DumpErronousSession(session, errors)
{
	try
	{
		await InsertFailedValidation(session, errors);
		
	}
	catch (err)
	{
		console.error(err);
		await DumpToFile(session, errors);
	}
}

async function DumpToFile(session, errors)
{
	session.errors = errors;

	let demographics = {
		Compensation: session.Compensation,
	};

	let testSession = {
		TaskOrderName: session.TaskOrderName,
		Demographics: session.Demographics,
		Screen: session.Screen,
		Tests: session.Tests,
	};

	let demographicFile = Path.join(Config.ContactDumpDir, "contact_" + uuid.v4() + ".json");
	let sessionFile = Path.join(Config.SessionDumpDir, uuid.v4() + ".json");

	try
	{
		await Promise.all([
			fsp.writeFile(demographicFile, JSON.stringify(demographics)),
			fsp.writeFile(sessionFile, JSON.stringify(testSession))
		]);
	}
	catch (err)
	{
		console.log("Failed to dump session to file");
		console.log(demographics);
		console.log(testSession);
	}
}