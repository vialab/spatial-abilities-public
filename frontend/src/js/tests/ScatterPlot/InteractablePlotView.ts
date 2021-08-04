import * as Three from "three";

import { TaskDisplay, UserInterface } from "../../io";
import { RandomPlane } from "./RandomPlane";
import { Option } from "../../ui/Option";
import { Graph } from "../../ui/components/Graph";
import { PlaneSelector } from "../../ui/components/PlaneSelector";
import { InteractableGraph } from "../../ui/components/InteractableGraph";
import { ScatterPlotPoints } from "../../ui/threejs/ScatterPlotPoints";
import { WireframeCube } from "../../ui/threejs/WireFrameCube";
import { Point } from "../../plotData/Point";
import { PlaneRotation } from "./PlaneRotation";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";
import { Vector2 } from "three";

export class InteractablePlotView extends TaskDisplay
{
	public CorrectPlane : Three.Vector3;
	private planeView : Graph;
	private fullView : InteractableGraph;
	private inputGrid : PlaneSelector;

	constructor(points : Point[], correctFace : Three.Vector3, axisLength : number)
	{
		super();
		let planeViewBorder = new WireframeCube(axisLength);
		let fullViewBorder = new WireframeCube(axisLength);

		let planeViewPoints = ScatterPlotPoints.FromPoints(points, axisLength, 5, 20);
		let fullViewPoints = ScatterPlotPoints.Clone(planeViewPoints);

		// let planeSelection = RandomPlane.Select();
		this.CorrectPlane = correctFace;
		let planeViewRotation = PlaneRotation.RotationFor(this.CorrectPlane);
		this.planeView = new Graph(planeViewBorder, planeViewPoints, axisLength);
		this.planeView.SetRotation(planeViewRotation);
		this.planeView.UseOrthographicCamera();

		let initialRotation = PlaneRotation.RotationFor(GraphPlaneNormals.TOWARDS);
		let rotationRange = new Three.Vector2(90, 90);

		this.fullView = new InteractableGraph(fullViewBorder, fullViewPoints, axisLength, initialRotation, rotationRange);
		this.fullView.UsePerspectiveCamera();

		this.inputGrid = new PlaneSelector(this.CorrectPlane);
		this.inputGrid.Bind(this.fullView);
	}

	public Dispose()
	{
		this.planeView.Dispose();
		this.fullView.Dispose();
	}

	public GetRotationTracker()
	{
		return this.fullView.RotationMetrics;
	}

	public GetOptions() : Option[]
	{
		let options = this.inputGrid.GetOptions();
		return options;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();

		let grid = this.inputGrid.Element();
		grid.css("flex", "1");

		let inputDiv = $(`<div style="display: flex; width: 100%; justify-content: flex-start;"><div style="flex: 1;"></div></div>`);
		inputDiv.append(grid);

		screen.OriginalViewContainer().append(this.planeView.Element());
		screen.ComparisonViewContainer().append(this.fullView.Element());
		
		screen.PromptContainer().append(inputDiv);

		this.planeView.RenderOnce();
		this.fullView.RenderContinuously();
	}
}