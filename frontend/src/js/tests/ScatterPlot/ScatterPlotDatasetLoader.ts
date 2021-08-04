import { TaskLoader } from "../../taskBase/TaskLoader";
import { Task } from "../../taskBase";
import { DatasetParser } from "../../plotData/DatasetParser";

import { Backend } from "../../Backend";
import { ScatterPlotTask } from "./ScatterPlotTask";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { FitToBoundsNormalizer } from "../../plotData/normalization/FitToBoundsNormalizer";
import * as Three from "three";
import { TestTypes } from "../TestTypes";

export class ScatterPlotDatasetLoader extends TaskLoader
{
	private backend : Backend;
	private offsets : {x: number, y: number, z: number};
	private datasetName : string;
	private axisLength : number;
	private correctFace : Three.Vector3;

	public CreatePractice = false;

	constructor(
		backend : Backend,
		datasetName : string,
		correctFace : Three.Vector3, 
		offsets : {x: number, y: number, z: number},
		axisLength : number
	)
	{
		super();
		this.offsets = offsets;
		this.backend = backend;
		this.datasetName = datasetName;
		this.correctFace = correctFace;
		this.axisLength = axisLength;
	}

	async Create(): Promise<Task>
	{
		let parser = new DatasetParser();
		let normalizer = new FitToBoundsNormalizer();

		parser.OffsetX = this.offsets.x;
		parser.OffsetY = this.offsets.y;
		parser.OffsetZ = this.offsets.z;

		let dataset = await this.backend.GetScatterPlotDataset(this.datasetName);
		let points = normalizer.Normalize(parser.Parse(dataset));

		let task = new ScatterPlotTask(points, this.correctFace, this.axisLength-10);
		task.Metadata.DatasetName = this.datasetName;
		task.Metadata.Offsets = this.offsets;
		task.IsPractice = this.CreatePractice;

		return task;
	}

	public Serialize() : SerializedTask
	{
		let serialization = {
			Name : ScatterPlotDatasetLoader.name,
			DatasetName: this.datasetName,
			IsPractice: this.CreatePractice,
			Metadata : {offset: this.offsets, CorrectFace: this.correctFace}
		};

		return serialization;
	}

	public ReturnedType() : number
	{
		return TestTypes.SCATTER_PLOT;
	}
}