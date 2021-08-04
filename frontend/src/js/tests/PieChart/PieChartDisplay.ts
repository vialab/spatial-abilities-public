import * as d3 from "d3";
import { TaskDisplay, UserInterface } from "../../io";
import { PieChartData, PieChartDataset } from "./PieChartDataset";
import { IdGenerator } from "../../util/IdGenerator";
import { OptionButton } from "../../ui/components/OptionButton";
import { Color } from "../../ui/Color";

export class PieChartDisplay extends TaskDisplay
{
	protected dataset : PieChartDataset;

	protected width = 450;
	protected height = 450;
	protected margin = 40;

	buttons : OptionButton[];

	public Colors  = [
		"#1b9e77",
		"#d95f02",
		"#7570b3",
		"#e7298a",
		"#66a61e",
		"#e6ab02"
	];

	constructor(dataset : PieChartDataset, buttons : OptionButton[])
	{
		super();
		this.dataset = dataset;
		this.buttons = buttons;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();
		this.displayPie(screen.OriginalViewContainer(), this.dataset.Left);
		this.displayPie(screen.ComparisonViewContainer(), this.dataset.Right);
		
		for (let i = 0; i < this.buttons.length; i++)
			screen.OptionsContainer().append(this.buttons[i].Element());
	}

	protected displayPie(container : JQuery<HTMLElement>, pieData : PieChartData) : void
	{
		let containerId : string = IdGenerator.Generate();
		container.append(`<div id="${containerId}" class="center-content" style="width: ${this.width}px; ${this.height}px;"></div>`);

		var radius = Math.min(this.width, this.height) / 2 - this.margin

		var svg = d3.select("#" + containerId).append("svg")
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("transform", "rotate("+pieData.Rotation+")")
			;
		
		var graphic = svg.append("g")
			.attr("transform", "translate(" + this.width/2 + "," + this.height/2 + ")");

		let drawData = this.ParseDrawData(pieData);

		let values = drawData.map(d => d.Value);
		let arcs = d3.pie().sort(null)(values);

		let arc = d3.arc()
			.innerRadius(0)
			.outerRadius(radius);

		graphic.selectAll("arc")
			.data(arcs)
			.enter()

			.append("g")
			.attr("class", "arc")

			.append("path")
			.attr('d', <any>arc)

			.attr('fill',
				function(d : any, i : number)
				{
					return drawData[i].Color;
				}
			)

			//Antialiased edges
			.attr("stroke",
				function(d : any, i : number)
				{
					return "#EEEEEE"//drawData[i].Color;
				}
			)
			.style("stroke-width", "1px")
			.attr("shape-rendering", "geometricPrecision")
			;
	}

	protected ParseDrawData(data : PieChartData) : Drawdata[]
	{
		let draw : Drawdata[] = [];

		for (let i = 0; i < data.Order.length; i++)
		{
			let index : number = data.Order[i];

			draw.push({
				Value : data.Slices[index],
				Color: this.Colors[index]
			})
		}

		return draw;
	}
}

interface Drawdata
{
	Value : number;
	Color : string;
}