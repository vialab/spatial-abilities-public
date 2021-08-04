import { Task, Option } from "../../taskBase";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartTutorialDisplay } from "./PieChartTutorialDisplay";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { SerializedTask } from "../../taskBase/SerializedTask";

export class PieChartTutorial extends Task
{
	constructor()
	{
		super(new PieChartTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("Pie Chart Instructions");
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public LogResults(log: ResultLog): void
	{
	}
	
	public Submit()
	{
		this.Controller.Submit([]);
	}
}