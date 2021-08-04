import { Point } from "../plotData/Point";
import { IndependentAxisNormalizer } from "../plotData/normalization/IndependentAxisNormalizer";

export class WaveGraphPoints
{
	public static GeneratePoints(pointsPerSlice : number, multiplier : number=1) : Point[]
	{
		let points : Point[] = [];
		let increment = 1/pointsPerSlice;

		for (let x = 0; x <= 1; x +=increment)
		{
			for (let z = 0; z <= 1; z += increment)
			{
				let screenY = (Math.sin(x*multiplier)-Math.cos(z*multiplier));
				let screenX = x - 0.5;
				let screenZ = z - 0.5;

				points.push(new Point(screenX, screenY, screenZ));
			}
		}

		return new IndependentAxisNormalizer().Normalize(points);
	}
}