import * as Three from "three";

import { TaskDisplay, UserInterface } from "../../../io";
import { Point } from "../../../plotData/Point";
import { Vector2, DirectionalLight, AmbientLight } from "three";
import { GraphPlane } from "../../../ui/threejs/GraphPlane";
import { InteractableGraph } from "../../../ui/components/InteractableGraph";
import { AxisLabel } from "../../../ui/threejs/AxisLabel";
import { Graph } from "../../../ui/components/Graph";

export class HeatmapComparison extends TaskDisplay
{
	private interactableGraph : InteractableGraph;
	private orthoGraph : Graph;

	constructor(points : Point[], axisLength : number)
	{
		super();

		let interactableAxisLabel = new AxisLabel(axisLength);
		let interactablePlane = GraphPlane.FromPoints(points, axisLength);
		let orthoPlane = GraphPlane.Clone(interactablePlane);
		
		this.interactableGraph = new InteractableGraph(interactableAxisLabel, interactablePlane, axisLength, new Vector2(0,0), new Three.Vector2(0, 360));
		this.interactableGraph.SetAmbientLightStrength(0.5);
		this.interactableGraph.SetCameraLightStrength(0.5);
		
		let orthoAxisLabel = new AxisLabel(axisLength);
		this.orthoGraph = new Graph(orthoAxisLabel, orthoPlane, axisLength);
		this.orthoGraph.UseOrthographicCamera();
	}

	public Dispose()
	{
		this.interactableGraph.Dispose();
		this.orthoGraph.Dispose();
	}

	public Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();

		screen.ComparisonViewContainer().append(this.interactableGraph.Element());
		screen.OriginalViewContainer().append(this.orthoGraph.Element());

		this.interactableGraph.RenderContinuously();
		this.orthoGraph.RenderOnce();
	}
	
}