import { Normalizer } from "./Normalizer";
import { Point } from "../Point";

export class LinearScaleNormalizer implements Normalizer
{
	Normalize(points: Point[]): Point[]
	{
		let normalizedPoints : Point[] = [];
		let highestAxisValue = -Infinity;

		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			let absX = Math.abs(point.X);
			let absY = Math.abs(point.Y);
			let absZ = Math.abs(point.Z);

			if (absX > highestAxisValue)
				highestAxisValue = absX;
			if (absY > highestAxisValue)
				highestAxisValue = absY;
			if (absZ > highestAxisValue)
				highestAxisValue = absZ;

			normalizedPoints[i] = new Point(point.X, point.Y, point.Z);
		}

		for (let i = 0; i < normalizedPoints.length; i++)
		{
			let point = normalizedPoints[i];
			point.X = point.X / highestAxisValue;
			point.Y = point.Y / highestAxisValue;
			point.Z = point.Z / highestAxisValue;
		}

		return normalizedPoints;
	}
}