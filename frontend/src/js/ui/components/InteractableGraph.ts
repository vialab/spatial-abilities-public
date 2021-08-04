import * as Three from "three";

import { Graph } from "./Graph";
import { OrbitControls } from "three-orbitcontrols-ts";
import { ThreeJsComponent } from "../threejs/ThreeJsComponent";
import { GraphRotationTracker } from "../../metrics";
import { Vector2 } from "three";
let CameraControls : any = require("camera-controls");

export class InteractableGraph extends Graph
{
	public readonly RotationMetrics : GraphRotationTracker;

	perspectiveCameraControl : any;
	orthographicCameraControl : any;

	timer : Three.Clock;

	element : JQuery<HTMLElement>;

	constructor(border : ThreeJsComponent, points : ThreeJsComponent, axisLength : number, initialRotation : Three.Vector2, maxRotation : Three.Vector2)
	{
		super(border, points, axisLength);

		this.perspectiveCameraControl = new CameraControls(this.perspectiveCamera, this.renderer.domElement);
		this.perspectiveCameraControl.dollySpeed = 0;
		this.perspectiveCameraControl.truckSpeed = 0;
		this.orthographicCameraControl = new CameraControls(this.orthographicCamera, this.renderer.domElement);
		this.orthographicCameraControl.dollySpeed = 0;
		this.orthographicCameraControl.truckSpeed = 0;
		this.timer = new Three.Clock();

		this.SetRotation(initialRotation);
		this.applyRotationLimit(initialRotation, maxRotation);

		this.element = super.Element();
		this.element.css("cursor", "grab");

		this.element.mousedown(() =>
		{
			this.element.css("cursor", "grabbing");
		});
		this.element.mouseup(() =>
		{
			this.element.css("cursor", "grab");
		});

		this.RotationMetrics = new GraphRotationTracker(
			this.Element(),
			this.GetRotation(),
			() =>
			{
				return this.GetOrbitRotation();
			}
		);
	}

	public SetRotation(rotation : Three.Vector2)
	{
		this.perspectiveCameraControl.rotateTo(this.toRadians(rotation.y), this.toRadians(rotation.x), false);
		this.orthographicCameraControl.rotateTo(this.toRadians(rotation.y), this.toRadians(rotation.x), false);
	}

	public GetRotation() : {x:number, y:number}
	{
		return {
			x: this.toDegrees(this.perspectiveCameraControl.polarAngle),
			y: this.toDegrees(this.perspectiveCameraControl.azimuthAngle)
		}
	}

	public Dispose()
	{
		super.Dispose();
		this.RotationMetrics.Dispose();
		this.perspectiveCameraControl.dispose();
		this.orthographicCameraControl.dispose();
	}

	public GetOrbitRotation() : {x:number, y:number}
	{
		let x = this.toDegrees(this.perspectiveCameraControl.polarAngle);
		let y = this.toDegrees(this.perspectiveCameraControl.azimuthAngle);

		return {x, y};
	}

	protected applyRotationLimit(initialRotation : Three.Vector2, maxDistance :Three.Vector2)
	{
		let minVertical = 0;
		let maxVertical = Math.PI;

		let minHorizontal = -Infinity;
		let maxHorizontal = Infinity;

		if (maxDistance.x < 180)
		{
			minVertical = initialRotation.x - (maxDistance.x / 2);
			maxVertical = initialRotation.x + (maxDistance.x / 2);

			if (minVertical > maxVertical)
			{
				let tmp = minVertical;
				minVertical = maxVertical;
				maxVertical = tmp;
			}
		}

		if (maxDistance.y < 360)
		{
			minHorizontal = initialRotation.y - (maxDistance.y / 2);
			maxHorizontal = initialRotation.y + (maxDistance.y / 2);

			if (minHorizontal < 0)
			{
				this.rotateSceneY(-minHorizontal);
				this.SetRotation(new Vector2(this.GetRotation().x, this.GetRotation().y - minHorizontal));

				maxHorizontal -= minHorizontal;
				minHorizontal = 0;
			}

			if (minHorizontal > maxHorizontal)
			{
				let tmp = minHorizontal;
				minHorizontal = maxHorizontal;
				maxHorizontal = tmp;
			}
		}

		this.SetRotationLimits(new Vector2(minVertical, minHorizontal), new Vector2(maxVertical, maxHorizontal));
	}

	public SetRotationLimits(lowerLimit : Three.Vector2, upperLimit : Three.Vector2)
	{
		this.perspectiveCameraControl.minPolarAngle = this.toRadians(lowerLimit.x);
		this.perspectiveCameraControl.maxPolarAngle = this.toRadians(upperLimit.x);
		this.perspectiveCameraControl.minAzimuthAngle = this.toRadians(lowerLimit.y);
		this.perspectiveCameraControl.maxAzimuthAngle = this.toRadians(upperLimit.y);

		this.orthographicCameraControl.minPolarAngle = this.toRadians(lowerLimit.x);
		this.orthographicCameraControl.maxPolarAngle = this.toRadians(upperLimit.x);
		this.orthographicCameraControl.minAzimuthAngle = this.toRadians(lowerLimit.y);
		this.orthographicCameraControl.maxAzimuthAngle = this.toRadians(upperLimit.y);
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}

	protected Render()
	{
		let delta = this.timer.getDelta();
		this.perspectiveCameraControl.update(delta);
		this.orthographicCameraControl.update(delta);

		super.Render();
	}
}