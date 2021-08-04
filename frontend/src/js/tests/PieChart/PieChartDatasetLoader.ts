import { TaskLoader, Task } from "../../taskBase";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { Backend } from "../../Backend";
import { PieChart } from "./PieChart";

export class PieChartDatasetLoader extends TaskLoader
{
	private backend : Backend;
	private datasetName : string;

	public CreatePractice : boolean = false;

	constructor(backend : Backend, datasetName : string)
	{
		super();
		this.backend = backend;
		this.datasetName = datasetName;
	}

	public async Create(): Promise<Task>
	{
		let dataset = await this.backend.GetPieChartDataset(this.datasetName);
		let task = new PieChart(dataset);
		task.IsPractice = this.CreatePractice;
		task.Metadata.DatasetName = this.datasetName;
		return task;
	}

	public Serialize(): SerializedTask
	{
		return {
			Name: PieChartDatasetLoader.name,
			DatasetName: this.datasetName,
			IsPractice: this.CreatePractice,
			Metadata: {}
		};
	}

	public ReturnedType() : number
	{
		return 2;
	}
}