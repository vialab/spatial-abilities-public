import { Graph } from "./Graph";
import { IdGenerator } from "../../util/IdGenerator";

export class ToggleOrthographicButton
{
	private button : JQuery<HTMLElement>;
	private isViewOrthographic = false;

	constructor(plot : Graph | Graph[], isCurrentlyOrthographic : boolean)
	{
		this.isViewOrthographic = isCurrentlyOrthographic;

		let id = IdGenerator.Generate();
		this.button = $(`<button id="${id}">Toggle Orthographic/Perspective View</button>`);
		this.applyClickHandler(plot);
		
	}

	protected applyClickHandler(plot : Graph | Graph[])
	{
		let handler = plot instanceof Graph?
			() => {
				this.isViewOrthographic = !this.isViewOrthographic;

				if (this.isViewOrthographic)
					plot.UseOrthographicCamera();
				else
					plot.UsePerspectiveCamera();
			}
		:
			() =>
			{
				this.isViewOrthographic = !this.isViewOrthographic;
				let plots = <Graph[]>plot;

				if (this.isViewOrthographic)
					for (let i = 0; i < plots.length; i++)
					{
						plots[i].UseOrthographicCamera();
					}
				else
					for (let i = 0; i < plots.length; i++)
					{
						plots[i].UsePerspectiveCamera();
					}
			}


		this.button.click(handler);
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.button;
	}
}