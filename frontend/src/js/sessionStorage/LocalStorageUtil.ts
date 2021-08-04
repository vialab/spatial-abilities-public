import { TaskList } from "../taskBase";
import { ResultLog } from "../metrics/ResultLog";

export class LocalStorageUtil
{
	static TASK_LIST_KEY = "tasklist";
	static RESULT_KEY = "results";

	static SaveLocal(obj : TaskList | ResultLog)
	{
		if (obj instanceof TaskList)
		{
			let serialization = obj.Serialize();
			window.localStorage.setItem(LocalStorageUtil.TASK_LIST_KEY, JSON.stringify(serialization));
		}
		else
		{
			window.localStorage.setItem(LocalStorageUtil.RESULT_KEY, JSON.stringify(obj));
		}
	}

	static clearTasks()
	{
		window.localStorage.removeItem(LocalStorageUtil.TASK_LIST_KEY);
	}

	static clearResult()
	{
		window.localStorage.removeItem(LocalStorageUtil.RESULT_KEY);
	}
}