import { Normalizer } from "./Normalizer";
import { Point } from "../Point";

export class IsocontourDatasetNormalizer implements Normalizer
{
	Normalize(points: Point[]): Point[]
	{
		let normalizedPoints : Point[] = [];

		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			let x = (point.X - 0.5) * 2;
			let z = (point.Z - 0.5) * 2;
			let y = point.Y;

			normalizedPoints.push(new Point(x, y, z));
		}

		return normalizedPoints;
	}
}