import { TaskList, Task, TaskLoader, TaskFactory } from "../taskBase";
import { ConsentForm } from "../forms/ConsentForm";
import { DemographicTask } from "../forms/demograpic";
import { IshiharaTask } from "../forms/ishihara";
import { DemographicExclusion } from "../forms/exclusion";
import { LoadTasks } from "../LoadTasks";
import { StrategySurvey } from "../forms/strategySurvey";
import { ContactInformation } from "../forms/ContactInformation";
import { ThankYou } from "../forms/ThankYou";
import { LocalStorageUtil } from "./LocalStorageUtil";
import { Backend } from "../Backend";
import { ResultLog } from "../metrics/ResultLog";
import { Timer } from "../metrics";
import { TestSessionStorage } from "./TestSessionStorage";
import { IsocontourSampleTask } from "../tests/Isocontour/IsocontourSampleTask";
import { IsocontourDatasetLoader } from "../tests/Isocontour/IsocontourDatasetLoader";
import { ScatterPlotDatasetLoader } from "../tests/ScatterPlot/ScatterPlotDatasetLoader";
import { Vector3 } from "three";
import GraphPlaneNormals from "../ui/components/PlaneNormals";

export class NewSession extends TestSessionStorage
{
	taskFactory : TaskFactory;
	backend : Backend;
	resultLog : ResultLog;
	globalTimer : Timer;

	constructor(factory : TaskFactory, backend : Backend, resultLog : ResultLog, globalTimer : Timer)
	{
		super();
		this.taskFactory = factory;
		this.backend = backend;
		this.resultLog = resultLog;
		this.globalTimer = globalTimer;
	}

	async Load(): Promise<TaskList>
	{
		let demographicSurvey = new DemographicTask();
		let ishiharaTest = new IshiharaTask();
		let demographicEvaluation = new DemographicExclusion(this.backend, demographicSurvey, ishiharaTest);

		let initialTasks : (Task | TaskLoader)[] = [
			new ConsentForm(),
			demographicSurvey,
			ishiharaTest,
			demographicEvaluation
		];

		let taskList = new TaskList(initialTasks);
		let loadRemaining = new LoadTasks(this.backend, this.taskFactory, taskList, demographicSurvey);

		taskList.Add(loadRemaining);

		loadRemaining.Append(new StrategySurvey());
		loadRemaining.Append(new ContactInformation(this.backend, this.resultLog, this.globalTimer));
		loadRemaining.Append(new ThankYou());

		return taskList;
	}

	Save(list: TaskList)
	{
		LocalStorageUtil.SaveLocal(list);
	}

	Clear() : void
	{
		LocalStorageUtil.clearTasks();
	}
}