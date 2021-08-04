import { Normalizer } from "./Normalizer";
import { Point } from "../Point";

export class IndependentAxisNormalizer implements Normalizer
{
	Normalize(points: Point[]): Point[]
	{
		let normalizedPoints : Point[] = [];
		let highestX = -Infinity;
		let highestY = -Infinity;
		let highestZ = -Infinity;

		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			let absX = Math.abs(point.X);
			let absY = Math.abs(point.Y);
			let absZ = Math.abs(point.Z);

			if (absX > highestX)
				highestX = absX;
			if (absY > highestY)
				highestY = absY;
			if (absZ > highestZ)
				highestZ = absZ;

			normalizedPoints[i] = new Point(point.X, point.Y, point.Z);
		}

		for (let i = 0; i < normalizedPoints.length; i++)
		{
			let point = normalizedPoints[i];
			point.X = point.X / highestX;
			point.Y = point.Y / highestY;
			point.Z = point.Z / highestZ;
		}

		return normalizedPoints;
	}

}