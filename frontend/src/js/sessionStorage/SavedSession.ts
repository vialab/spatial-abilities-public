import { TaskFactory, TaskList } from "../taskBase";
import { LocalStorageUtil } from "./LocalStorageUtil";
import { TestSessionStorage } from "./TestSessionStorage";

export class SavedSession extends TestSessionStorage
{
	factory : TaskFactory;

	constructor(factory : TaskFactory)
	{
		super();
		this.factory = factory;
	}

	async Load(): Promise<TaskList>
	{
		let serializedListJson = window.localStorage.getItem(LocalStorageUtil.TASK_LIST_KEY);

		if (serializedListJson == null)
			throw new Error("No task list is saved in LocalStorage");

		let serializedList = JSON.parse(<string>serializedListJson);
		let taskList = TaskList.Deserialize(serializedList, this.factory);

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

	static IsLocalSessionSaved() : boolean
	{
		return window.localStorage.getItem(LocalStorageUtil.TASK_LIST_KEY) != null;
	}
}