import { PieChart } from "./PieChart";
import { PieChartDataset } from "./PieChartDataset";

export class PieChartSample extends PieChart
{
	constructor()
	{
		let data : PieChartDataset = {
			Name: "Sample",
			DeviationType: 0,
			Left: {
				Rotation: 0,
				Slices: [1,1,1,1,1,1],
				Order : [2,4,3,0,5,1]
			},
			Right: {
				Rotation: 0,
				Slices: [1,1,1,1,1,1],
				Order : [0,1,2,3,4,5]
			}
		};

		super(data);
		this.IsPractice = true;
	}
}