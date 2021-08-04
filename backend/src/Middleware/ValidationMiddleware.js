let {Validate} = require("../Validation/TestSessionValidator");

module.exports = function(req, res, next)
{
	let errors = Validate(req.body);
	req.errors = errors;
	next();
}