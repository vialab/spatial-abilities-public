import { ResultLog } from "../metrics/ResultLog";
import { ResultStorage } from "./ResultStorage";
import { LocalStorageUtil } from "./LocalStorageUtil";

export class SavedResult extends ResultStorage
{
	async Load(): Promise<ResultLog>
	{
		let parsedLog : any = JSON.parse(<string>window.localStorage.getItem(LocalStorageUtil.RESULT_KEY));
		let log : any = new ResultLog();
		let values = Object.entries(parsedLog);
		
		for (let i = 0; i < values.length; i++)
		{
			let key = values[i][0];
			let value = values[i][1];
			log[key] = value;
		}

		return log;
	}

	Save(list: ResultLog): void
	{
		LocalStorageUtil.SaveLocal(list);
	}

	Clear(): void
	{
		LocalStorageUtil.clearResult();
	}

	static IsLocalResultSaved()
	{
		return window.localStorage.getItem(LocalStorageUtil.RESULT_KEY) != null;
	}
}