import { Task, TaskController, Option } from "../../taskBase";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay } from "../../io";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { Point } from "../../plotData/Point";
import { ContourPlotComparison } from "./Displays/ContourPlotComparison";
import { OptionButton } from "../../ui/components/OptionButton";
import { LimitedTimer } from "../../metrics";
import { TestTypes } from "../TestTypes";

export class IsocontourTask extends Task
{
	isMatching : boolean;
	options : OptionButton[];

	private view : ContourPlotComparison;

	constructor(contourPoints : Point[], planePoints : Point[], isMatching : boolean, axisLength : number)
	{
		let yesOption = new OptionButton(0, "Yes", isMatching? 1 : 0, true);
		let noOption = new OptionButton(1, "No", isMatching? 0 : 1, true);

		let options = [
			yesOption,
			noOption
		];

		let graphDisplay = new ContourPlotComparison(
			contourPoints,
			planePoints,
			options,
			axisLength
		);
		
		super(graphDisplay, new EmptyTaskcontroller());
		
		this.view = graphDisplay;

		this.isMatching = isMatching;

		this.SetCofidenceTracked(true);
		this.SetResultsTracked(true);
		this.SetPrompt("Does the 2D plot represent the 3D plot?");

		this.options = options;

		this.SetTimer(new LimitedTimer(this, 600000));

		this.ShowProgress = true;

		this.Type = TestTypes.ISOCONTOUR;
	}

	public Rotate3dPlotTo(theta : number, phi : number)
	{
		this.view.Rotate3dPlotTo(theta, phi);
	}

	public Submit()
	{
		this.Controller.Submit(this.options);
	}

	public LogResults(log : ResultLog) : void
	{
		let thisLog = this.CreateLog();
		thisLog.Rotations = this.CreateRotationLogs(
			(<ContourPlotComparison>this.Display).GetRotationTracker()
		);
		thisLog.Options = this.CreateOptionLogs(this.options);

		log.LogTest(thisLog);
	}
}