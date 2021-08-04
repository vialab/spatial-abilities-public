import {Task} from "./Task";
import { TaskLoader } from "./TaskLoader";
import { SerializedTask } from "./SerializedTask";
import { TaskFactory } from ".";

export class TaskList
{
	currentIndex : number;
	tasks : (TaskLoader | Task)[];

	constructor(tasks : (TaskLoader | Task)[])
	{
		this.currentIndex = 0;
		this.tasks = tasks;
	}

	Add(task : Task | TaskLoader)
	{
		this.tasks.push(task);
	}

	Next() : TaskLoader | Task
	{
		return this.tasks[this.currentIndex++];
	}

	Previous() : TaskLoader | Task | null
	{
		return this.currentIndex == 0? null : this.tasks[this.currentIndex - 1]; 
	}

	AllTasks() : (TaskLoader | Task)[]
	{
		return this.tasks;
	}

	AmountCompleted(testType : number) : number
	{
		return this.tasks.reduce((count, task, index) =>
		{
			
			return  (
						index < this.currentIndex-1 //Before current task
						&& ( //Task type equal
							task instanceof TaskLoader?
								task.ReturnedType() : task.Type
						) == testType
					)?
					count + 1 : count;
		}, 0);
	}

	TotalAmount(testType : number) : number
	{
		return this.tasks.reduce((count, task) =>
			(task instanceof TaskLoader? task.ReturnedType() : task.Type)
			== testType?
			count + 1 : count
		, 0);
	}

	RemainingTasks() : (TaskLoader | Task)[]
	{
		return this.tasks.slice(this.currentIndex);
	}

	IsComplete() : boolean
	{
		return this.currentIndex >= this.tasks.length;
	}

	Serialize() : any
	{
		let serializedTasks : SerializedTask[] = [];

		for (let i = 0; i < this.tasks.length; i++)
		{
			serializedTasks.push(this.tasks[i].Serialize());
		}

		return {
			currentIndex: this.currentIndex,
			tasks : serializedTasks
		}
	}

	static Deserialize(serialization : any, factory : TaskFactory) : TaskList
	{
		let tasks : (Task | TaskLoader)[] = [];
		for (let i = 0; i < serialization.tasks.length; i++)
		{
			tasks.push(factory.Create(serialization.tasks[i]));
		}

		let list = new TaskList(tasks);
		list.currentIndex = serialization.currentIndex;

		factory.BindInterDependencies(list);

		return list;
	}
}