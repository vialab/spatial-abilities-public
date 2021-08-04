export interface PieChartDataset
{
	Name : string;
	DeviationType : number;
	Left : PieChartData;
	Right: PieChartData;
}

export interface PieChartData
{
	Rotation : number;
	Slices : number[];
	Order : number[];
}