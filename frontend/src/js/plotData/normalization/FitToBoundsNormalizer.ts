import { Normalizer } from "./Normalizer";
import { Point } from "../Point";

export class FitToBoundsNormalizer implements Normalizer
{
	Normalize(points: Point[]): Point[]
	{
		let normalizedPoints : Point[] = [];
		
		let lowestX = Infinity;
		let lowestY = Infinity;
		let lowestZ = Infinity;

		let highestX = -Infinity;
		let highestY = -Infinity;
		let highestZ = -Infinity;

		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];

			if (point.X > highestX)
				highestX = point.X;
			else if (point.X < lowestX)
				lowestX = point.X;

			if (point.Y > highestY)
				highestY = point.Y;
			else if (point.Y < lowestY)
				lowestY = point.Y;

			if (point.Z > highestZ)
				highestZ = point.Z;
			else if (point.Z < lowestZ)
				lowestZ = point.Z;
			

			normalizedPoints[i] = new Point(point.X, point.Y, point.Z);
		}

		let xRange = highestX - lowestX;
		let yRange = highestY - lowestY;
		let zRange = highestZ - lowestZ;

		for (let i = 0; i < normalizedPoints.length; i++)
		{
			let point = normalizedPoints[i];
			point.X = ((point.X - lowestX) / xRange - 0.5) * 2;
			point.Y = ((point.Y - lowestY) / yRange - 0.5) * 2;
			point.Z = ((point.Z - lowestZ) / zRange - 0.5) * 2;
		}

		return normalizedPoints;
	}
}