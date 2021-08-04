import * as Three from "three";
import { IdGenerator } from "../../util/IdGenerator";
import GraphPlaneNormals from "./PlaneNormals";
import { Graph } from "./Graph";
import { UiElement } from "../UiElement";
import { Option, NonDisplayOption } from "../Option";
import { Vector3 } from "three";

export class PlaneSelector implements UiElement
{
	element : JQuery<HTMLElement>;

	selectedCell : JQuery<HTMLElement> | null;

	public HighlightColour : string = "rgba(255,255,0,1)";

	public OnPlaneHighlighted : (planeNormal : Three.Vector3) => void = ()  => {};
	public OnPlaneUnHilighted : (planeNormal : Three.Vector3) => void = () => {};
	public OnPlaneSelected : (planeNormal : Three.Vector3) => void = () => {};

	private options : {[direction : string]: NonDisplayOption}
	private selectedOption : NonDisplayOption | null = null;

	constructor(correctPlane : Vector3)
	{
		this.selectedCell = null;

		let gridContainerId = IdGenerator.Generate();
		let template = `<div style="display: flex;"><div id="${gridContainerId}" style="flex: 1"></div></div>`;
		let element = $(template);
		let gridContainer = element.find("#"+gridContainerId);

		gridContainer.append(this.buildGrid());

		this.element = element;

		this.options = {
			"up": new NonDisplayOption(0, "top", 0),
			"down": new NonDisplayOption(0, "bottom", 0),
			"left": new NonDisplayOption(0, "left", 0),
			"right": new NonDisplayOption(0, "right", 0),
			"away": new NonDisplayOption(0, "away", 0),
			"towards": new NonDisplayOption(0, "towards", 0),
		};

		let keys = Object.keys(this.options);
		for (let i = 0; i < keys.length; i++)
		{
			let key = keys[i];
			let option = this.options[key];

			let normal = this.planeStringToNormal(key);

			if (normal.equals(correctPlane))
			{
				option.CorrectState = 1;
				break;
			}
		}
	}

	public GetOptions() : Option[]
	{
		return Object.values(this.options);
	}

	public Bind(graph : Graph)
	{
		this.OnPlaneHighlighted = (planeNormal : Three.Vector3) =>
		{
			graph.TogglePlaneHighlight(planeNormal);
		}

		this.OnPlaneUnHilighted = (planeNormal : Three.Vector3) =>
		{
			graph.TogglePlaneHighlight(planeNormal);
		}
	}
	
	private buildGrid() : JQuery<HTMLElement>
	{
		const CELL_WIDTH = 50;
		const CELL_HEIGHT = 50;

		const TABLE_WIDTH = CELL_WIDTH * 3;
		const TABLE_HEIGHT = CELL_HEIGHT * 4;

		let table = $(
			`<table style="width: ${TABLE_WIDTH}px; height: ${TABLE_HEIGHT}px">
				<tr>
					<td></td>
					<td class="grid-select" data-plane="up"></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td class="grid-select" data-plane="away"></td>
					<td></td>
				</tr>
				<tr>
					<td class="grid-select" data-plane="left"></td>
					<td class="grid-select" data-plane="down"></td>
					<td class="grid-select" data-plane="right"></td>
				</tr>
				<tr>
					<td></td>
					<td class="grid-select" data-plane="towards"></td>
					<td></td>
				</tr>
			</table>`
		);

		let cells = table.find(".grid-select");

		cells.mouseenter((evt) =>
		{
			let cell = $(evt.target);

			if (this.selectedCell != null && cell != this.selectedCell)
				this.unHighlight(this.selectedCell);
			this.highlight(cell);
		});

		cells.mouseleave((evt) =>
		{
			let cell = $(evt.target);

			if (cell != this.selectedCell) this.unHighlight(cell);
			if (this.selectedCell != null && cell != this.selectedCell)
				this.highlight(this.selectedCell);
		});

		cells.click((evt) =>
		{
			if (this.selectedOption != null)
				this.selectedOption.SetCurrentState(0);

			let cell = $(evt.target);
			let plane = this.getCorrespondingPlaneNormal(cell);
			this.selectedCell = cell;

			let planeString = cell.data("plane");
			this.selectedOption = this.options[planeString];
			this.selectedOption.SetCurrentState(1);

			this.OnPlaneSelected(plane);
		});

		return table;
	}

	private highlight(cell : JQuery<HTMLElement>) : void
	{
		cell.css("background-color", this.HighlightColour);
		this.OnPlaneHighlighted(this.getCorrespondingPlaneNormal(cell));
	}

	private unHighlight(cell : JQuery<HTMLElement>) : void
	{
		cell.css("background-color", "rgba(0,0,0,0)");
		this.OnPlaneUnHilighted(this.getCorrespondingPlaneNormal(cell));
	}

	public SelectedPlane() : Three.Vector3 | null
	{
		return this.selectedCell == null? null : this.getCorrespondingPlaneNormal(this.selectedCell);
	}

	private getCorrespondingPlaneNormal(gridCell : JQuery<HTMLElement>) : Three.Vector3
	{
		//TODO bind the grid's data-plane to a normal vector relative to view direction

		let plane = gridCell.data("plane");
		let direction = this.planeStringToNormal(plane);
		let closestPlane : Three.Vector3;

		closestPlane = this.closestPlane(direction);
		return closestPlane;
	}

	private planeStringToNormal(plane : string) : Three.Vector3
	{
		if (plane == "up")
			return GraphPlaneNormals.UP;
		else if (plane == "down")
			return GraphPlaneNormals.DOWN;
		else if (plane == "away")
			return GraphPlaneNormals.AWAY;
		else if (plane == "towards")
			return GraphPlaneNormals.TOWARDS;
		else if (plane == "right")
			return GraphPlaneNormals.RIGHT;
		else if (plane == "left")
			return GraphPlaneNormals.LEFT;
		else
			throw new Error("PlaneSelector plane normal strings are misconfigured. A cell has an invalid data-plane property.");
	}

	private closestPlane(normal : Three.Vector3) : Three.Vector3
	{
		let closestNormal = GraphPlaneNormals.ALL[0];
		let closestDotProduct = normal.dot(GraphPlaneNormals.ALL[0]);

		for (let i = 1; i < GraphPlaneNormals.ALL.length; i++)
		{
			let planeNormal = GraphPlaneNormals.ALL[i];
			let dotProduct = normal.dot(planeNormal);

			if (dotProduct > closestDotProduct)
			{
				closestNormal = planeNormal;
				closestDotProduct = dotProduct;
			}
		}

		return closestNormal;
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}
}