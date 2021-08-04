
let {RotatingPointer} = require("./RotatingPointer");
let {IsArray, IsObject} = require("../Validation/TypeValidation");
let {
	COMPUTER_SCIENCE,
	CHEMISTRY,
	EDUCATION,
	SOCIAL_SCIENCE,
} = require("../Constants/FieldsOfStudy");

module.exports = {
	GetOrder
};

let currentOrder = 0;

let testOrders = [
	require("./OrderSchemas/01"),
	require("./OrderSchemas/02"),
	require("./OrderSchemas/03"),
	require("./OrderSchemas/04"),
	require("./OrderSchemas/05"),
	require("./OrderSchemas/06"),
];

let TestOrders = [];
TestOrders[COMPUTER_SCIENCE] = new RotatingPointer(testOrders);
TestOrders[CHEMISTRY] = new RotatingPointer(testOrders);
TestOrders[EDUCATION] = new RotatingPointer(testOrders);
TestOrders[SOCIAL_SCIENCE] = new RotatingPointer(testOrders);

let ScatterPlotOrders = [];
ScatterPlotOrders[COMPUTER_SCIENCE] = new RotatingPointer(require("./ScatterPlotFaceSelection/Faces"));
ScatterPlotOrders[CHEMISTRY] = new RotatingPointer(require("./ScatterPlotFaceSelection/Faces"));
ScatterPlotOrders[EDUCATION] = new RotatingPointer(require("./ScatterPlotFaceSelection/Faces"));
ScatterPlotOrders[SOCIAL_SCIENCE] = new RotatingPointer(require("./ScatterPlotFaceSelection/Faces"));

let Tasks = {
	"Rotation": {
		Tutorial: {
			"Name": "RotationTutorial",
			"DatasetName": "",
			"IsPractice": false,
			"Metadata": {}
		},
		Tasks: require("./TestPools/3dRotation.json"),
		Shuffle: false,
	},
	"Pie": {
		Tutorial: {
			"Name": "PieChartTutorial",
			"DatasetName": "",
			"IsPractice": false,
			"Metadata": {}
		},
		Trials: [{
			"Name": "PieChartSample",
			"DatasetName": "",
			"IsPractice": true,
			"Metadata": {}
		}],
		Tasks: require("./TestPools/PieCharts.json"),
	},
	"Isocontour": {
		Tutorial: {
			"Name": "IsocontourTutorial",
			"DatasetName": "",
			"IsPractice": false,
			"Metadata": {}
		},
		Trials: [{
			"Name": "IsocontourSampleTask",
			"DatasetName": "sample",
			"IsPractice": true,
			"Metadata": {}
		}],
		Tasks: require("./TestPools/Isocontour.json"),
	},
	"ScatterPlot": {
		Tutorial: {
			"Name": "ScatterPlotTutorial",
			"DatasetName": "",
			"IsPractice": false,
			"Metadata": {}
		},
		Trials: [{
			"Name": "ScatterPlotDatasetLoader",
			"DatasetName": "iris",
			"IsPractice": true,
			"Metadata": {
				"offset": {
					"x": 1, "y": 2, "z": 3
				},
				"Rotation": {
					"x": 0,
					"y": 45
				}
			}
		}],
		Tasks: require("./TestPools/ScatterPlot.json"),
	}
};

function GetOrder(fieldOfStudy)
{
	let orderScheme = TestOrders[fieldOfStudy].Next();
	let tasks = BuildTestOrder(orderScheme, fieldOfStudy);

	console.log("Loaded test order " + orderScheme.Name + " for field of study " + fieldOfStudy);

	return tasks;
}

function BuildTestOrder(orderScheme, fieldOfStudy)
{
	let taskList = [];

	let orderName = orderScheme.Name;
	
	for (let i = 0; i < orderScheme.Order.length; i++)
	{
		let taskName = orderScheme.Order[i];
		let tutorial = GetTutorial(taskName);
		let trials = GetTrials(taskName);
		let currentTaskList = Clone(GetTasks(taskName));
		let postProcess = GetPostProcessor(taskName, fieldOfStudy);

		taskList.push(tutorial);

		for (let i = 0; i < trials.length; i++)
		{
			taskList.push(Clone(trials[i]));
		}

		for (let i = 0; i < currentTaskList.length; i++)
		{
			let task = currentTaskList[i];
			postProcess(task);
		}
		
		currentTaskList = ShuffleTasks(taskName, currentTaskList);

		for (let i = 0; i < currentTaskList.length; i++)
		{
			taskList.push(currentTaskList[i]);
		}

		//Push in the post-first task window after the first task
		if (i == 0)
		{
			taskList.push({
				"Name": "AfterFirstTask",
				"DatasetName": "",
				"IsPractice": false,
				"Metadata": {}
			});
		}
	}

	return {
		Name: orderName,
		Tests: taskList,
	};
}

function GetTutorial(taskName)
{
	return Tasks[taskName].Tutorial;
}

function GetTrials(taskName)
{
	return Tasks[taskName].Trials || [];
}

function GetTasks(taskName)
{
	let taskList = Tasks[taskName];
	return taskList.Tasks;
}

function ShuffleTasks(taskName, tasks)
{
	let taskList = Tasks[taskName];
	let shuffle = taskList.Shuffle !== undefined? taskList.Shuffle : true;
	return shuffle? Shuffle(tasks) : tasks;	
}

function GetPostProcessor(taskName, fieldOfStudy)
{
	if (taskName == "ScatterPlot")
	{
		let indexInPointer = ScatterPlotOrders[fieldOfStudy].index;
		let order = ScatterPlotOrders[fieldOfStudy].Next();
		let i = 0;

		console.log("Loaded scatter plot task order for field of study " + fieldOfStudy + " at index " + indexInPointer);

		return (task) =>
		{
			task.Metadata.CorrectFace = order[i++];
		}
	}

	return (task) => {};
}

function Shuffle(array)
{
	let results = [];
	for (let i = 0; i < array.length; i++) results.push(array[i]);
	
	for(let i = results.length - 1; i > 0; i--)
	{
		let swapIndex = Math.floor(Math.random() * i)
		let tmp = results[i]
		results[i] = results[swapIndex]
		results[swapIndex] = tmp
	}

	return results;
}

function Clone(obj)
{
	if (IsArray(obj))
		return CloneArray(obj);
	else if (!IsObject(obj))
		return obj;

	let clone = {};

	for (let index in obj)
	{
		let value = obj[index];

		if (IsArray(value))
		{
			clone[index] = CloneArray(value);
		}
		else if (IsObject(value))
		{
			clone[index] = Clone(value);
		}
		else
		{
			clone[index] = value;
		}
	}
	
	return clone;
}

function CloneArray(value)
{
	let arr = [];

	for (let i = 0; i < value.length; i++)
	{
		arr.push(Clone(value[i]))
	}

	return arr;
}