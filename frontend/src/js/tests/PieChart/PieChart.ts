import { Task } from "../../taskBase";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartDisplay } from "./PieChartDisplay";
import { PieChartDataset } from "./PieChartDataset";
import { OptionButton } from "../../ui/components/OptionButton";
import { LimitedTimer } from "../../metrics";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { TestTypes } from "../TestTypes";

export class PieChart extends Task
{
	data : PieChartDataset;
	options : OptionButton[];

	constructor(dataset : PieChartDataset)
	{
		let isMatchingDataset = dataset.DeviationType <= 3;

		let yesOption = new OptionButton(0, "Yes", isMatchingDataset? 1 : 0, true);
		let noOption = new OptionButton(1, "No", isMatchingDataset? 0 : 1, true);
		
		let options = [
			yesOption,
			noOption
		];

		super(
			new PieChartDisplay(
				dataset,
				options
			),
			new EmptyTaskcontroller()
		);

		this.data = dataset;
		this.SetCofidenceTracked(true);

		this.options = options;
				
		this.SetTimer(new LimitedTimer(this, 600000));
		this.SetPrompt("Do these pie charts represent the same data?");
		this.SetResultsTracked(true);

		this.ShowProgress = true;

		this.Type = TestTypes.PIE_CHART;
	}

	public Submit()
	{
		this.Controller.Submit(this.options);
	}

	public LogResults(log: ResultLog): void
	{
		let options = this.CreateOptionLogs(this.options);
		let testLog = this.CreateLog();

		testLog.Options = options;

		log.LogTest(testLog);
	}
}