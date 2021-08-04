import { Task, Option } from "../../taskBase";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay, UserInterface } from "../../io";
import { RandomPoints } from "../../util/RandomPoints";
import { InteractableGraph } from "../../ui/components/InteractableGraph";
import { WireframeCube } from "../../ui/threejs/WireFrameCube";
import { ScatterPlotPoints } from "../../ui/threejs/ScatterPlotPoints";
import { Vector2, Plane } from "three";
import { Graph } from "../../ui/components/Graph";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { PlaneSelector } from "../../ui/components/PlaneSelector";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { TimedTestNotification } from "../../ui/components/TimedTestNotification";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";

export class ScatterPlotTutorial extends Task
{
	constructor()
	{
		super(new ScatterPlotTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("Scatter Plot Instructions");
		this.SetCofidenceTracked(false);
		this.SetExplicitSubmissionRequired(true);
	}

	public Submit()
	{
		this.Controller.Submit([]);
	}

	public LogResults(log: ResultLog): void
	{
	}
}

class ScatterPlotTutorialDisplay extends TaskDisplay
{
	private interactableGraph : InteractableGraph;
	private orthoGraph : Graph;
	private planeSelector : PlaneSelector;

	public constructor()
	{
		super();
		let graphAxisSize = 350;
		
		let points = RandomPoints.Generate(100, -1, 1);
		this.interactableGraph = new InteractableGraph(
			new WireframeCube(graphAxisSize),
			ScatterPlotPoints.FromPoints(points, graphAxisSize, 5, 5),
			graphAxisSize,
			new Vector2(90,45),
			new Vector2(90, 90)
		);

		this.orthoGraph = new Graph(
			new WireframeCube(graphAxisSize),
			ScatterPlotPoints.FromPoints(points, graphAxisSize, 5, 5),
			graphAxisSize
		);
		this.orthoGraph.UseOrthographicCamera();

		this.planeSelector = new PlaneSelector(GraphPlaneNormals.UP);
		this.planeSelector.Bind(this.interactableGraph);
	}

	public Dispose()
	{
		this.interactableGraph.Dispose();
		this.orthoGraph.Dispose();
	}
	
	public Display(screen: UserInterface): void
	{
		let graphContainer = $(`<div style="display: flex;" class="center-content"></div>`);
		let ortho = $(`<div></div>`);
		let interactable = $(`<div></div>`);
		let interactionGrid = $(`<div style="width: 50%; margin-left: 50%"></div>`);

		let template = $(
		`<div style="text-align: center; width: 80%;">
			<hr />
			<p>You will be shown a 2D view of a 3D scatter plot, and the corresponding 3D scatter plot.</p>
			<p>Choose the side of the 3D scatter plot corresponding to the 2D view.</p>
			<p>You can rotate the 3D view by clicking on it and dragging your mouse.</p>
			<p>The amount which you are allowed to rotate the 3D view is limited.</p>
			<br />
			<p>Hovering your mouse on a square of the unfolded cube will highlight the corresponding side in the 3D view.</p>
			<p>Click that the unfolded square to select it.</p>
			<hr />
		</div>`
		);

		ortho.append(this.orthoGraph.Element());
		interactable.append(this.interactableGraph.Element());
		interactionGrid.append(this.planeSelector.Element());

		graphContainer.append(ortho);
		graphContainer.append(interactable);
		
		template.prepend(interactionGrid);
		template.prepend(graphContainer);

		template.append(new TimedTestNotification().Element());

		this.orthoGraph.RenderOnce();
		this.interactableGraph.RenderContinuously();

		screen.SubmitButton().html("Begin");
		screen.ViewModeContent();
		screen.ContentContainer().append(template);
	}
}