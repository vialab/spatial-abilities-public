import * as Three from "three";
import { Graph } from "../components/Graph";

export class Orbit
{
	public readonly RotationDelta : Three.Vector2;
	public RotationLimit : Three.Vector2;
	public RotationSpeed = 0.5;

	private element : JQuery<HTMLElement>;
	private graph : Graph;

	private isDragging = false;
	private previousMousePosition : Three.Vector2;

	private onMouseDown : (event : JQuery.Event) => void;
	private onMouseMove : (event : JQuery.Event) => void;
	private onMouseUp : (event : JQuery.Event) => void;

	constructor(element : JQuery<HTMLElement>, graph : Graph)
	{
		this.RotationDelta = new Three.Vector2(0, 0);
		this.RotationLimit = new Three.Vector2(90, 180);
		this.previousMousePosition = new Three.Vector2(0, 0);

		this.element = element;
		this.graph = graph;

		this.onMouseDown = (evt) =>
		{
			this.isDragging = true;
			this.previousMousePosition.x = <number>evt.pageX;
			this.previousMousePosition.y = <number>evt.pageY;
		};
		
		this.onMouseMove = (evt) =>
		{
			if (this.isDragging)
			{
				let deltaX = <number>evt.pageX - this.previousMousePosition.x;
				let deltaY = <number>evt.pageY - this.previousMousePosition.y;

				let rotateX = deltaY * this.RotationSpeed;
				let rotateY = deltaX * this.RotationSpeed;

				let current = this.graph.GetRotation();
				let rotation = new Three.Vector2(current.x + rotateX, current.y + rotateY);

				this.RotationDelta.x += rotateX;
				this.RotationDelta.y += rotateY;

				this.graph.SetRotation(rotation);

				this.previousMousePosition.x = <number>evt.pageX;
				this.previousMousePosition.y = <number>evt.pageY;
			}
		}
		
		this.onMouseUp = (evt) =>
		{
			this.isDragging = false;
		}
	}

	protected LimitRotation(rotation : Three.Vector2)
	{
	}

	public BindEvents()
	{
		this.element.mousedown(this.onMouseDown);
		$(document).mousemove(this.onMouseMove);
		$(document).mouseup(this.onMouseUp);
	}

	public Dispose()
	{
		this.element.off("mousedown", this.onMouseDown);
		$(document).off("mousemove", this.onMouseMove);
		$(document).off("mouseup", this.onMouseUp);
	}
}