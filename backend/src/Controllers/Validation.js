let {IsFieldOfStudyFull} = require("../Database/DemographicCheck");

module.exports = {
	CheckIfFieldFull
};

async function CheckIfFieldFull(req, res, next)
{
	let isFull = await IsFieldOfStudyFull(req.params.field);
	res.send(isFull);
}