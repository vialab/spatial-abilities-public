import { ContourPlotComparison } from "./ContourPlotComparison";
import { WaveGraphPoints } from "../../../util/WaveGraphPoints";
import { OptionButton } from "../../../ui/components/OptionButton";

export class WaveGraphContourComparison extends ContourPlotComparison
{
	constructor(axisLength : number, options : OptionButton[] = [])
	{
		let points = WaveGraphPoints.GeneratePoints(40, 15);
		super(points, points, [], axisLength);
	}
}