import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../../io";
import { Point } from "../../../plotData/Point";
import { Vector2, DirectionalLight, AmbientLight, Vector3 } from "three";
import { GraphPlane } from "../../../ui/threejs/GraphPlane";
import { InteractableGraph } from "../../../ui/components/InteractableGraph";
import { Isolines } from "../../../ui/threejs/Isolines";
import { AxisLabel } from "../../../ui/threejs/AxisLabel";
import { Graph } from "../../../ui/components/Graph";
import { GraphRotationTracker } from "../../../metrics";
import { OptionButton } from "../../../ui/components/OptionButton";
import { PlaneRotation } from "../../ScatterPlot/PlaneRotation";
import GraphPlaneNormals from "../../../ui/components/PlaneNormals";

export class ContourPlotComparison extends TaskDisplay
{
	private interactableGraph : InteractableGraph;
	private orthoGraph : Graph;

	private buttons : OptionButton[];

	constructor(contourPoints : Point[], planePoints : Point[], buttons : OptionButton[], axisLength : number)
	{
		super();

		let interactableAxisLabel = new AxisLabel(axisLength);
		let interactablePlane = GraphPlane.FromPoints(planePoints, axisLength);
		let orthoPlane = new Isolines(contourPoints, axisLength);
		
		this.interactableGraph = new InteractableGraph(
			interactableAxisLabel,
			interactablePlane,
			axisLength,
			new Vector2(90, 0),
			new Three.Vector2(60, 360)
		);
		this.interactableGraph.SetAmbientLightStrength(1);
		this.interactableGraph.SetCameraLightStrength(0);
		
		let orthoRotation = PlaneRotation.RotationFor(GraphPlaneNormals.UP).add(new Vector2(0, 270))

		let orthoAxisLabel = new AxisLabel(axisLength);
		this.orthoGraph = new Graph(orthoAxisLabel, orthoPlane, axisLength);
		this.orthoGraph.SetRotation(orthoRotation);
		this.orthoGraph.UseOrthographicCamera();

		this.buttons = buttons;
	}

	public Rotate3dPlotTo(theta : number, phi : number)
	{
		this.interactableGraph.SetRotation(new Vector2(theta, phi));
	}

	public Dispose()
	{
		this.interactableGraph.Dispose();
		this.orthoGraph.Dispose();
	}

	public GetRotationTracker()
	{
		return this.interactableGraph.RotationMetrics;
	}

	public GetInteractableGraph() : Graph
	{
		return this.interactableGraph;
	}

	public GetPlaneView() : Graph
	{
		return this.orthoGraph;
	}

	public Display(screen: UserInterface): void
	{
		this.GetInteractableGraph().RenderContinuously();
		this.GetPlaneView().RenderContinuously();

		screen.ViewModeComparison();

		screen.ComparisonViewContainer().append(this.GetInteractableGraph().Element());
		screen.OriginalViewContainer().append(this.GetPlaneView().Element());

		for (let i = 0; i < this.buttons.length; i++)
			screen.OptionsContainer().append(this.buttons[i].Element());
	}
}