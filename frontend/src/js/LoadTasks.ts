import { Task, TaskList, TaskFactory, TaskLoader } from "./taskBase";
import { ResultLog } from "./metrics/ResultLog";
import { EmptyTaskDisplay } from "./taskBase/EmptyTaskDisplay";
import { EmptyTaskcontroller } from "./taskBase/EmptyTaskController";
import { Backend } from "./Backend";
import { SerializedTask } from "./taskBase/SerializedTask";
import { DemographicTask } from "./forms/demograpic";

export class LoadTasks extends Task
{
	private backend : Backend;
	private appendTasks : (Task | TaskLoader)[] = [];
	private taskList : TaskList;
	private factory : TaskFactory;
	private demographics : DemographicTask;

	private taskOrderName : string = "";

	constructor(backend : Backend, factory: TaskFactory, taskList : TaskList, demographics: DemographicTask)
	{
		super(new EmptyTaskDisplay(), new EmptyTaskcontroller());
		this.backend = backend;
		this.factory = factory;
		this.taskList = taskList;
		this.demographics = demographics;

		this.SetResultsTracked(true);
	}
	
	public SetTaskList(taskList : TaskList)
	{
		this.taskList = taskList;
	}

	public SetDemographicForm(demographic : DemographicTask)
	{
		this.demographics = demographic;
	}

	public Append(task : Task | TaskLoader)
	{
		this.appendTasks.push(task);
	}

	public async Initialize()
	{
		let fieldOfStudy = <number>this.demographics.GetInputData().FieldOfStudy;
		let taskOrder = await this.backend.GetTestOrder(fieldOfStudy);

		this.taskOrderName = taskOrder.Name;

		console.log("Loaded task order. Schema: " + this.taskOrderName);

		for (let i = 0; i < taskOrder.Tests.length; i++)
		{
			let serialization = taskOrder.Tests[i];
			let task = this.factory.Create(serialization);

			this.taskList.Add(task);
		}

		for (let i = 0; i < this.appendTasks.length; i++)
		{
			this.taskList.Add(this.appendTasks[i]);
		}

		this.Controller.Complete();
	}

	public Submit(): void
	{
	}

	public LogResults(log: ResultLog): void
	{
		log.TaskOrderName = this.taskOrderName;
	}

	public Serialize() : SerializedTask
	{
		let serialization = super.Serialize();
		let serializedTasks = this.appendTasks.map(t => t.Serialize());
		serialization.Metadata.appendTasks = serializedTasks;
		
		return serialization;
	}

	public SetValues(serialization : SerializedTask)
	{
		let serializedAppend = <SerializedTask[]>serialization.Metadata.appendTasks || this.appendTasks;
		let appendTasks = serializedAppend.map(s => this.factory.Create(s));
		this.appendTasks = appendTasks;
	}
}