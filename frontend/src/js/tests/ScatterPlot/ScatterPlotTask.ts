import { RequireOneSelectedOptionController, Task } from "../../taskBase";
import { ResultLog } from "../../metrics/ResultLog";
import { Point } from "../../plotData/Point";
import { InteractablePlotView } from "./InteractablePlotView";
import { LimitedTimer } from "../../metrics";
import * as Three from "three";
import { TestTypes } from "../TestTypes";

export class ScatterPlotTask extends Task
{
	constructor(points : Point[], correctFace : Three.Vector3, axisLength : number)
	{
		let display = new InteractablePlotView(points, correctFace, axisLength-10);
		super(display, new RequireOneSelectedOptionController());

		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(true);
		this.SetResultsTracked(true);

		this.SetTimer(new LimitedTimer(this, 600000));

		this.ShowProgress = true;

		this.Type = TestTypes.SCATTER_PLOT;
	}

	public LogResults(log : ResultLog) : void
	{
		let loggedTest = this.CreateLog();
		loggedTest.Rotations = this.CreateRotationLogs(
			(<InteractablePlotView>this.Display).GetRotationTracker()
		);
		loggedTest.Options = this.CreateOptionLogs(
			(<InteractablePlotView>this.Display).GetOptions()
		);
		
		log.LogTest(loggedTest);
	}

	public Submit()
	{
		this.Controller.Submit((<InteractablePlotView>this.Display).GetOptions());
	}
}