import { Option } from "../../taskBase";
import { TaskController } from "../../taskBase/TaskController";

export class ScatterPlotController extends TaskController
{
	constructor()
	{
		super();
	}

	public Submit(selectedOptions: Option): void
	{
		this.Complete();
	}

	public SelectPlane(x : number, y : number, z : number)
	{
		
	}
}