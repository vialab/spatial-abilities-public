import { Task } from "../../taskBase";
import { WaveGraphContourComparison } from "./Displays/WaveGraphContourComparison";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { ResultLog } from "../../metrics/ResultLog";
import { OptionButton } from "../../ui/components/OptionButton";
import { IsocontourTask } from "./IsocontourTask";
import { WaveGraphPoints } from "../../util/WaveGraphPoints";

export class IsocontourSampleTask extends IsocontourTask
{
	constructor(axisLength : number)
	{
		let points = WaveGraphPoints.GeneratePoints(40, 15);
		super(points, points, true, axisLength);
		this.Rotate3dPlotTo(90, 0);
		this.IsPractice = true;
	}
}