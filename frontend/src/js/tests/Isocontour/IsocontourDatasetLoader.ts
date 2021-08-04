import { TaskLoader } from "../../taskBase/TaskLoader";
import { Task } from "../../taskBase";
import { Backend } from "../../Backend";
import { IsocontourTask } from "./IsocontourTask";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { DatasetParser } from "../../plotData/DatasetParser";
import { IsocontourDatasetNormalizer } from "../../plotData/normalization/IsocontourDatasetNormalizer";
import { TestTypes } from "../TestTypes";

export class IsocontourDatasetLoader extends TaskLoader
{
	private backend : Backend;
	private datasetName : string;
	private axisLength : number;
	private isMatching : boolean;

	public CreatePractice = false;

	constructor(backend: Backend, datasetName : string, isMatching : boolean, axisLength : number)
	{
		super();
		this.backend = backend;
		this.datasetName = datasetName;
		this.isMatching = isMatching;
		this.axisLength = axisLength;
	}

	async Create(): Promise<Task>
	{
		let normalizer = new IsocontourDatasetNormalizer();
		let parser = new DatasetParser();
		
		//Swap y and z values because our components use y as vertical axis
		parser.OffsetY = 2;
		parser.OffsetZ = 1;
		
		let contourDatasetName = "stimulus"+this.datasetName+"_contour";
		let planeDatasetName = "stimulus"+this.datasetName+"_3dplot";

		let [contourDataset, planeDataset] =
			await Promise.all([
				this.backend.GetIsocontourDataset(contourDatasetName),
				this.backend.GetIsocontourDataset(planeDatasetName)
			]);
		
		console.log("Loaded dataset " + contourDatasetName);
		console.log("Loaded dataset " + planeDatasetName);

		let normalizedContour = parser.Parse(contourDataset);
		let normalizedPlane = parser.Parse(planeDataset);

		normalizedContour = normalizer.Normalize(normalizedContour);
		normalizedPlane = normalizer.Normalize(normalizedPlane);
		
		let task = new IsocontourTask(normalizedContour, normalizedPlane, this.isMatching, this.axisLength);
		task.Rotate3dPlotTo(planeDataset.Theta, planeDataset.Phi);
		task.Metadata.DatasetName = this.datasetName;
		task.IsPractice = this.CreatePractice;

		return task;
	}

	Serialize() : SerializedTask
	{
		return {
			Name : IsocontourDatasetLoader.name,
			DatasetName: this.datasetName,
			IsPractice: this.CreatePractice,
			Metadata: {IsMatch : this.isMatching}
		};
	}

	public ReturnedType() : number
	{
		return TestTypes.ISOCONTOUR;
	}
}