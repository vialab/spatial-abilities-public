import { Point } from "../plotData/Point";

export class RandomPoints
{
	static Generate(numberOfPoints : number, min : number, max : number) : Point[]
	{
		let points : Point[] = [];

		for (let i = 0; i < numberOfPoints; i++)
		{
			points[i] = new Point(randomValue(), randomValue(), randomValue());
		}

		return points;

		function randomValue()
		{
			return Math.random() * (max - min) + min;
		}
	}
}