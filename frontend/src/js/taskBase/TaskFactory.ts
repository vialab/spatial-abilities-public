import { Task, TaskLoader, TaskList } from ".";
import { SerializedTask } from "./SerializedTask";
import { Backend } from "../Backend";
import { PieChartDatasetLoader } from "../tests/PieChart/PieChartDatasetLoader";
import { ScatterPlotDatasetLoader } from "../tests/ScatterPlot/ScatterPlotDatasetLoader";
import { DemographicTask } from "../forms/demograpic";
import { IshiharaTask } from "../forms/ishihara";
import { ContactInformation } from "../forms/ContactInformation";
import { ResultLog } from "../metrics/ResultLog";
import { DemographicExclusion } from "../forms/exclusion";
import { ScatterPlotTutorial } from "../tests/ScatterPlot/ScatterPlotTutorial";
import { IsocontourTutorial } from "../tests/Isocontour/IsocontourTutorial";
import { PieChartTutorial } from "../tests/PieChart/PieChartTutorial";
import { IsocontourDatasetLoader } from "../tests/Isocontour/IsocontourDatasetLoader";
import { ElementSizeSettings } from "../ui/ElementSizeSettings";
import { ThankYou } from "../forms/ThankYou";
import { UnlimitedTimer } from "../metrics";
import { AfterFirstTask } from "../forms/AfterFirstTaskWindow";
import { RandomPlane } from "../tests/ScatterPlot/RandomPlane";
import * as Three from "three";
import GraphPlaneNormals from "../ui/components/PlaneNormals";
import { IsocontourSampleTask } from "../tests/Isocontour/IsocontourSampleTask";
import { PieChartSample } from "../tests/PieChart/PieChartSample";
import { ConsentForm } from "../forms/ConsentForm";
import { LoadTasks } from "../LoadTasks";
import { StrategySurvey } from "../forms/strategySurvey";
import { RotationRemovedNotice } from "../tests/RotationRemovedNotice/RotationRemovedNotice";

export class TaskFactory
{
	backend : Backend;
	resultLog : ResultLog;
	elementSizing : ElementSizeSettings;

	constructor(backend : Backend, resultLog : ResultLog, elementSizing : ElementSizeSettings)
	{
		this.backend = backend;
		this.resultLog = resultLog;
		this.elementSizing = elementSizing;
	}

	Create(task : SerializedTask) : Task | TaskLoader
	{
		let result : Task | TaskLoader | null = null;

		if (task.Name == DemographicTask.name)
		{
			result = new DemographicTask();
		}
		else if (task.Name == IshiharaTask.name)
		{
			result = new IshiharaTask();
		}
		else if (task.Name == DemographicExclusion.name)
		{
			result = new DemographicExclusion(this.backend, new DemographicTask(), new IshiharaTask());
		}
		else if (task.Name == "RotationTutorial" || task.Name == "RotationTask" || task.Name == "RotationRemovedNotice")
		{
			result = new RotationRemovedNotice();
		}
		else if (task.Name == PieChartTutorial.name)
		{
			result = new PieChartTutorial();
		}
		else if (task.Name == "PieChartDatasetLoader")
		{
			let loader = new PieChartDatasetLoader(this.backend, task.DatasetName);
			loader.CreatePractice = task.IsPractice;
			result = loader;
		}
		else if (task.Name == ScatterPlotTutorial.name)
		{
			result = new ScatterPlotTutorial();
		}
		else if (task.Name == ScatterPlotDatasetLoader.name)
		{
			let correctFace = typeof(task.Metadata.CorrectFace) == "object"?
				new Three.Vector3(task.Metadata.CorrectFace.x, task.Metadata.CorrectFace.y, task.Metadata.CorrectFace.z)
				: StringToFaceNormal(task.Metadata.CorrectFace);

			let loader = new ScatterPlotDatasetLoader(
				this.backend,
				task.DatasetName,
				correctFace,
				<{x: number, y: number, z: number}>task.Metadata.offset,
				this.elementSizing.CanvasSideLength()
			);
			loader.CreatePractice = task.IsPractice,
			result = loader;
		}
		else if (task.Name == IsocontourTutorial.name)
		{
			result = new IsocontourTutorial();
		}
		else if (task.Name == IsocontourDatasetLoader.name)
		{
			let loader = new IsocontourDatasetLoader(
				this.backend,
				task.DatasetName,
				task.Metadata.IsMatch,
				this.elementSizing.CanvasSideLength()
			);
			loader.CreatePractice = task.IsPractice;
			result = loader;
		}
		else if (task.Name == ContactInformation.name)
		{
			result = new ContactInformation(this.backend, this.resultLog, new UnlimitedTimer());
		}
		else if (task.Name == ThankYou.name)
		{
			result = new ThankYou();
		}
		else if (task.Name == AfterFirstTask.name)
		{
			result = new AfterFirstTask();
		}
		else if (task.Name == IsocontourSampleTask.name)
		{
			result = new IsocontourSampleTask(this.elementSizing.CanvasSideLength());
		}
		else if (task.Name == PieChartSample.name)
		{
			result = new PieChartSample();
		}
		else if (task.Name == ConsentForm.name)
		{
			result = new ConsentForm();
		}
		else if (task.Name == LoadTasks.name)
		{
			result = new LoadTasks(this.backend, this, new TaskList([]), new DemographicTask());
		}
		else if (task.Name == StrategySurvey.name)
		{
			result = new StrategySurvey();
		}

		if (result instanceof Task)
			result.SetValues(task);

		if (result == null)
			throw new Error(`No matching task name found: "${task.Name}"`);
		else
			return result;
	}

	BindInterDependencies(taskList : TaskList)
	{
		let demographic = this.findDemographic(taskList);
		this.bindDemographicToLoader(taskList, demographic);
		this.bindDemographicToExclusion(taskList, demographic);
	}

	private findDemographic(taskList : TaskList) : DemographicTask
	{
		return <DemographicTask>taskList.AllTasks().filter(task => task instanceof DemographicTask)[0];
	}

	private bindDemographicToLoader(taskList : TaskList, demographic : DemographicTask)
	{
		let loader = this.findLoader(taskList);
		if (loader != null && demographic != null)
		{
			loader.SetTaskList(taskList);
			loader.SetDemographicForm(demographic);
		}
	}
	private findLoader(taskList : TaskList) : LoadTasks
	{
		return <LoadTasks>taskList.AllTasks().filter(t => t instanceof LoadTasks)[0];
	}

	private bindDemographicToExclusion(taskList : TaskList, demographic : DemographicTask)
	{
		let exclusion = this.findExclusion(taskList);
		let ishihara = this.findIshihara(taskList);

		if (exclusion != null && ishihara != null && demographic != null)
		{
			exclusion.SetDemographicForm(demographic);
			exclusion.SetIshiharaForm(ishihara);
		}
	}

	private findExclusion(taskList : TaskList) : DemographicExclusion
	{
		return <DemographicExclusion>taskList.AllTasks().filter(t => t instanceof DemographicExclusion)[0];
	}

	private findIshihara(taskList : TaskList) : IshiharaTask
	{
		return <IshiharaTask>taskList.AllTasks().filter(t => t instanceof IshiharaTask)[0];
	}
}

function StringToFaceNormal(str : string) : Three.Vector3
{
	if (str == "L")
		return GraphPlaneNormals.LEFT;
	else if (str == "R")
		return GraphPlaneNormals.RIGHT;
	else if (str == "T")
		return GraphPlaneNormals.UP;
	else if (str == "B")
		return GraphPlaneNormals.DOWN;
	else if (str == "M")
		return GraphPlaneNormals.AWAY;
	else
		return RandomPlane.Select();
}