let {GetOrder} = require("../TestOrdering/TestOrderProvider");

module.exports = {
	GetTaskOrder
};

function GetTaskOrder(req, res, next)
{
	res.send(GetOrder(Number.parseInt(req.query.fieldOfStudy)));
}