import { ResultStorage } from "./ResultStorage";
import { ResultLog } from "../metrics/ResultLog";
import { LocalStorageUtil } from "./LocalStorageUtil";

export class NewResult extends ResultStorage
{
	async Load(): Promise<ResultLog>
	{
		let log = new ResultLog();

		log.Screen.Width = window.screen.width;
		log.Screen.Height = window.screen.height;
		log.Screen.Dpi = 0;

		console.log("Screen settings loaded into results (DPI unreadable): ", log.Screen);

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
}