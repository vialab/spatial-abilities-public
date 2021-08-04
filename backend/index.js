const PORT = 8080;

let Config = require("./config.json");

let express = require("express");
let bodyparser = require("body-parser");

let StringTrimMiddleware = require("./src/Middleware/TrimStrings");
let ValidationMiddleware = require("./src/Middleware/ValidationMiddleware");
let CaptchaMiddleware = require("./src/Middleware/CaptchaValidator");

let DatasetServer = require("./src/Controllers/DatasetServer");
let SubmissionController = require("./src/Controllers/Submission");
let ValidationController = require("./src/Controllers/Validation");
let TestOrderController = require("./src/Controllers/TestOrder");

let app = express();

app.use(bodyparser.json({limit: '50mb'}));

app.get("/api/datasets/:folder/:file", DatasetServer.GetFile);
app.use("/api/datasets-static", express.static(Config.DatasetDirectory));

app.post("/api/submit",
	CaptchaMiddleware,
	StringTrimMiddleware,
	ValidationMiddleware,
	SubmissionController.Submit
);
app.get("/api/IsFieldFull/:field",
	ValidationController.CheckIfFieldFull
);

app.get("/api/ping",
	(req, res) => res.send("pong")
);

app.get("/api/testorder",
	TestOrderController.GetTaskOrder
);

app.listen(PORT, () =>
{
	console.log(`Server listening on port ${PORT}`)
});