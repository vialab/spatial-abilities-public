import { Task, Option } from "../../taskBase";
import { TaskController } from "../../taskBase/TaskController";

export class IsocontourController extends TaskController
{
	constructor()
	{
		super();
	}

	public Submit(selectedOptions: Option | Option[]): void
	{
		this.Complete();
	}
}