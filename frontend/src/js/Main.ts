//Silly hack import. Save yourself the headache and keep it here.
import "./tests/PieChart/PieChartDatasetLoader";

import {TaskLoader, Task, TaskList, TaskFactory} from "./taskBase";
import {UserInterface} from "./io/UserInterface";

import { Backend } from "./Backend";
import { ConfidenceWindow } from "./io/ConfidenceWindow";
import { ResultLog } from "./metrics/ResultLog";
import { BrowserDetails } from "./BrowserDetails";
import { TestSessionStorage } from "./sessionStorage/TestSessionStorage";
import { DefaultElementSizeSettings } from "./ui/ElementSizeSettings";
import { UnlimitedTimer } from "./metrics";
import { ThankYou } from "./forms/ThankYou";
import { BackgroundTask } from "./taskBase/BackgroundTask";
import { PracticeTestWrapper } from "./taskBase/PracticeTestWrapper";
import { ResultStorage } from "./sessionStorage/ResultStorage";
import { SavedResult } from "./sessionStorage/SavedResult";
import { NewResult } from "./sessionStorage/NewResult";
import { SavedSession } from "./sessionStorage/SavedSession";
import { NewSession } from "./sessionStorage/NewSession";
import { ApplicationState } from "./ApplicationState";

let CameraControls : any = require("camera-controls");
import * as Three from "three";
import { getType } from "@turf/turf";

CameraControls.install({THREE: Three});

let UI : UserInterface;
let LoadingScreen : ConfidenceWindow;
let backend = new Backend();

let Results : ResultLog = new ResultLog();

let SessionStorage : TestSessionStorage;
let ResultsStorage : ResultStorage;
let testList : TaskList;
let CurrentTask : Task;
let ResolveLoading : (task : Task) => void;

let GlobalTimer = new UnlimitedTimer();
GlobalTimer.Start();

$(async function Main()
{
	UI = new UserInterface();
	LoadingScreen = UI.GetIntermediateTestScreen();

	let browser = new BrowserDetails();

	if (browser.IsMobile())
	{
		UI.ViewModeMobileBrowserRejection();
		return;
	}

	await LoadSession();
	ApplyPageEventHandlers();
	
	NextTask();
});

async function LoadSession()
{
	ResultsStorage = SavedResult.IsLocalResultSaved()?
		new SavedResult() : new NewResult();
	
	Results = await ResultsStorage.Load();

	let factory = new TaskFactory(
		backend,
		Results,
		new DefaultElementSizeSettings()
	);

	SessionStorage = SavedSession.IsLocalSessionSaved()?
		new SavedSession(factory)
		:
		new NewSession(factory, backend, Results, GlobalTimer);
	
	testList = await SessionStorage.Load();
}

function ApplyPageEventHandlers()
{
	$("#submit-test").click(() =>
	{
		try
		{
			CurrentTask.Submit();
		}
		catch (err)
		{
			UI.SetErrorMessage(err.message);
		}
	});	
}

async function NextTask()
{
	var isUsingLoadingScreen = false;
	let confidenceForType = -1;

	if (testList.IsComplete())
	{
		AllTestsCompleted();
		return;
	}

	let previousTask = testList.Previous();
	let nextTask = testList.Next();

	//Confidence bar
	//TODO always shows for TaskLoader as previous type regardless of if isConfidenceTracked is set
	if (
		(
			(previousTask instanceof Task && previousTask.IsConfidenceTracked())
			|| previousTask instanceof TaskLoader
		)
		&& GetType(nextTask) != GetType(previousTask)
	)
	{
		LoadingScreen.ResetConfidence();
		LoadingScreen.ShowConfidenceBar();

		confidenceForType = GetType(previousTask);
	}
	else
	{
		LoadingScreen.HideConfidenceBar();
	}

	//Loading screen
	if (!(nextTask instanceof Task && nextTask.OverrideIntermediateScreen))
	{
		isUsingLoadingScreen = true;
		LoadingScreen.Show();
	}

	if (nextTask instanceof TaskLoader)
	{
		CurrentTask = await BeginLoadingTask(nextTask);
	}
	else
	{
		CurrentTask = nextTask;
	}

	CurrentTask.GetTimer().TickCallback = () =>
	{
		UI.SetTimerProgress(CurrentTask.GetTimer().Progress())
	};

	LoadingScreen.OnSubmit = () =>
	{
		let confidence = LoadingScreen.ConfidenceValue();
		
		Results.LogConfidence(confidenceForType, confidence);

		LoadingScreen.Hide();
		CurrentTask.GetTimer().Start();
	};

	if (CurrentTask instanceof ThankYou)
	{
		SessionStorage.Clear();
		ResultsStorage.Clear();
	}

	if (CurrentTask.ShowProgress)
	{
		let current = testList.AmountCompleted(CurrentTask.Type) + 1;
		let total = testList.TotalAmount(CurrentTask.Type);

		UI.ShowTestProgress(current, total);
	}
	else
	{
		UI.HideTestProgress();
	}

	if (CurrentTask.IsPractice)
	{
		CurrentTask.ApplyPracticeProperties();
		CurrentTask = new PracticeTestWrapper(CurrentTask);
	}

	ApplicationState.CurrentTask = CurrentTask;
	
	await BeginTaskInitialize(CurrentTask);

	if (!isUsingLoadingScreen)
		CurrentTask.GetTimer().Start();

	await CurrentTask.Controller.WaitForCompletion()
	CurrentTask.GetTimer().Stop();

	if (CurrentTask.IsResultsTracked())
		CurrentTask.LogResults(Results);
		
	await CurrentTask.Finish();
	CurrentTask.Dispose();

	SessionStorage.Save(testList);
	ResultsStorage.Save(Results);

	NextTask();
}

function GetType(task : Task | TaskLoader) : number
{
	return task instanceof TaskLoader? task.ReturnedType() : task.Type;
}

async function BeginLoadingTask(loader : TaskLoader) : Promise<Task>
{
	LoadingScreen.OnRetryLoading = async () =>
	{
		TryLoadTask(loader);
	};

	return new Promise(async (resolve, reject) =>
	{
		ResolveLoading = resolve;
		TryLoadTask(loader);
	});
}

async function TryLoadTask(loader : TaskLoader)
{
	LoadingScreen.ShowLoading();

	try
	{
		let test = await loader.Create();
		ResolveLoading(test);
	}
	catch (err)
	{
		console.error(err);
		LoadingScreen.ShowLoadingFailed();
	}
}

async function BeginTaskInitialize(task : Task)
{
	return new Promise((resolve, reject) =>
	{
		ResolveLoading = resolve;
		TryTaskInitialize(task);
	});
}

async function TryTaskInitialize(task : Task)
{
	LoadingScreen.ShowLoading();

	LoadingScreen.OnRetryLoading = async () =>
	{
		TryTaskInitialize(task);
	};

	try
	{
		await task.Initialize();
		DisplayTask(task);
		
		if (!(task instanceof BackgroundTask))
			LoadingScreen.ShowNextTestReady();
		
		ResolveLoading(task);
	}
	catch (err)
	{
		console.error(err);
		LoadingScreen.ShowLoadingFailed();
	}
}

function AllTestsCompleted()
{
}

function DisplayTask(task : Task)
{
	UI.ClearView();
	UI.ClearErrorMessage();
	
	UI.SetTimerProgress(0);

	UI.SetTitle(task.GetTitle());
	UI.SetPrompt(task.GetPrompt());
	UI.ShowOptions(task);

	UI.SubmitButton().html("Submit &raquo;");
	
	if (task.IsExplicitSubmissionRequired())
	{
		UI.ShowSubmitButton();
	}
	else
		UI.HideSubmitButton();
	
	task.Display.Display(UI);
}