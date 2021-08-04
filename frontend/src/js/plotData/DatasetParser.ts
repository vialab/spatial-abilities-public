import { Point } from "./Point";
import { Normalizer } from "./normalization/Normalizer";
import { Dataset } from "./Dataset";

export class DatasetParser
{
	public DatasetDimension = 3;

	public OffsetX = 0;
	public OffsetY = 1;
	public OffsetZ = 2;

	constructor()
	{
	}

	public Parse(dataset : Dataset) : Point[]
	{
		let points : Point[] = [];
		let datasetEnd = dataset.Data.length-1;

		for (let rowStartIndex = 0; rowStartIndex < datasetEnd; rowStartIndex += dataset.Dimension)
		{
			let x = dataset.Data[rowStartIndex + this.OffsetX];
			let y = dataset.Data[rowStartIndex + this.OffsetY];
			let z = dataset.Data[rowStartIndex + this.OffsetZ];

			let point = new Point(x, y, z);
			points.push(point);
		}

		return points;
	}
}