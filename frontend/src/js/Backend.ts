import { Dataset } from "./plotData/Dataset";
import { ResultLog } from "./metrics/ResultLog";
import { PieChartDataset } from "./tests/PieChart/PieChartDataset";
import {TestOrder} from "./TestOrder";
import { IsocontourDataset } from "./plotData/IsocontourDataset";

export class Backend
{
	public async IsFieldOfStudyAllowed(fieldOfStudy : number) : Promise<boolean>
	{
		let response = await $.get(`/api/IsFieldFull/${fieldOfStudy}`);
		return !<boolean>response;
	}

	public async GetScatterPlotDataset(name : string) : Promise<Dataset>
	{
		let response = await $.get(`/api/datasets/scatterplot/${name}`);
		return <Dataset>response;
	}

	public async GetIsocontourDataset(name : string) : Promise<IsocontourDataset>
	{
		let response = await $.get(`/api/datasets-static/isocontour/${name}.json`);
		let dataset = <IsocontourDataset>response;
		dataset.Dimension = 3;
		return dataset;
	}

	public async GetPieChartDataset(name : string) : Promise<PieChartDataset>
	{
		let datasetName = `pie_${name}`;
		let response = await $.get(`/api/datasets-static/piechart/${datasetName}.json`);
		let dataset = <PieChartDataset>response;
		dataset.Name = datasetName;
		return dataset;
	}

	public async SubmitSession(log : ResultLog, captcha : string) : Promise<void>
	{
		return await $.ajax({
			type: 'POST',
			url: '/api/submit?captcha='+captcha,
			contentType: 'application/json',
			data: JSON.stringify(log),
			dataType: 'json',
			processData: false,
		});
	}

	public async GetTestOrder(fieldOfStudy : number) : Promise<TestOrder>
	{
		return await $.get("/api/testorder?fieldOfStudy="+fieldOfStudy);
	}
}