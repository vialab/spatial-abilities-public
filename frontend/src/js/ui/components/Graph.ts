import * as Three from "three";
import { WireframeCube } from "../threejs/WireFrameCube";
import { ThreeJsComponent } from "../threejs/ThreeJsComponent";
import {UiElement} from "../UiElement";
import { PlaneHighlights } from "../threejs/PlaneHighlights";
import { Color } from "../Color";
import { Spherical, Vector3 } from "three";

export class Graph implements UiElement
{
	//For some reason getWorldDirection needs this, using single instance to save memory alloc
	protected static worldDirectionParameterVector = new Three.Vector3();
	protected CAMERA_PADDING : number = 125;

	protected renderer : Three.WebGLRenderer;
	protected scene : Three.Scene;
	protected activeCamera : Three.Camera;
	protected perspectiveCamera : Three.PerspectiveCamera;
	protected orthographicCamera : Three.OrthographicCamera;
	
	protected border : ThreeJsComponent;
	protected data : ThreeJsComponent;

	protected highlights : PlaneHighlights;

	protected directionalLight : Three.DirectionalLight;
	protected ambientLight : Three.AmbientLight;

	protected stopRender : boolean = false;

	protected initialPerspectiveDistance : number;
	protected initialOrthoDistance : number;

	constructor(border : ThreeJsComponent, data : ThreeJsComponent, axisLength : number)
	{
		this.renderer = new Three.WebGLRenderer();
		this.renderer.setSize(axisLength, axisLength);
		this.renderer.setClearColor(0xffffff);

		this.scene = new Three.Scene();

		this.perspectiveCamera = new Three.PerspectiveCamera(50, 1, 0.1, axisLength*4);
		this.perspectiveCamera.position.z = axisLength*2 + this.CAMERA_PADDING;
		this.initialPerspectiveDistance = this.perspectiveCamera.position.z;

		let orthographicSideLength = axisLength/2 + this.CAMERA_PADDING;
		this.orthographicCamera = new Three.OrthographicCamera(
			-orthographicSideLength,
			orthographicSideLength,
			orthographicSideLength,
			-orthographicSideLength,
			0.1, axisLength * 3
		);
		this.orthographicCamera.position.z = axisLength;
		this.initialOrthoDistance = this.orthographicCamera.position.z;

		this.activeCamera = this.perspectiveCamera;
		
		this.border = border;
		this.scene.add(this.border.Component());

		this.data = data;
		this.scene.add(this.data.Component());

		let lightColor = new Three.Color(1, 1, 1);

		this.directionalLight = new Three.DirectionalLight(lightColor, 0);
		this.scene.add(this.directionalLight);

		this.ambientLight = new Three.AmbientLight(lightColor, 1);
		this.scene.add(this.ambientLight);

		this.highlights = new PlaneHighlights(axisLength);

		//Silly hack for requestAnimationFrame call
		this.RenderContinuously = this.RenderContinuously.bind(this);
	}

	public Dispose()
	{
		this.StopRendering();
		this.renderer.forceContextLoss();
		this.renderer.dispose();
		this.scene.dispose();
		this.border.Dispose();
		this.data.Dispose();
		this.highlights.Dispose();
	}

	public SetRotation(rotation : Three.Vector2) : void
	{
		this.setCameraRotation(this.perspectiveCamera, rotation);
		this.setCameraRotation(this.orthographicCamera, rotation);
	}

	protected rotateSceneY(deg : number)
	{
		let euler = new Three.Euler(0, this.toRadians(deg), 0);
		this.scene.setRotationFromEuler(euler);
	}

	// protected rotateScene(rotation : Three.Vector2)
	// {
	// 	const Y_AXIS = new Vector3(0, 1, 0);
	// 	let spherical : Spherical = new Spherical(this.activeCamera.position.length(), this.toRadians(rotation.x), this.toRadians(rotation.y));
	// 	spherical.makeSafe();
	// 	let rotationQuaternion = new Three.Quaternion().setFromUnitVectors(this.activeCamera.up, Y_AXIS).inverse();
	// 	this.scene.rotation.setFromVector3(new Vector3().setFromSpherical(spherical).applyQuaternion(rotationQuaternion));
	// }

	private setCameraRotation(camera : Three.Camera, rotation : Three.Vector2)
	{
		const Y_AXIS = new Vector3(0, 1, 0);
		let spherical : Spherical = new Spherical(camera.position.length(), this.toRadians(rotation.x), this.toRadians(rotation.y));
		spherical.makeSafe();
		let rotationQuaternion = new Three.Quaternion().setFromUnitVectors(camera.up, Y_AXIS).inverse();
		camera.position.setFromSpherical(spherical).applyQuaternion(rotationQuaternion);
	}

	public GetRotation() : {x:number, y:number}
	{
		let rotation = {
			x: this.toDegrees(this.scene.rotation.x),
			y: this.toDegrees(this.scene.rotation.y)
		};

		return rotation;
	}

	public SetCameraLightStrength(strength : number)
	{
		this.directionalLight.intensity = strength;
	}

	public SetAmbientLightStrength(strength : number)
	{
		this.ambientLight.intensity = strength;
	}

	protected toRadians(deg : number)
	{
		return deg * Math.PI / 180;
	}

	protected toDegrees(rad : number)
	{
		return rad*180/Math.PI;
	}

	public TogglePlaneHighlight(planeNormal : Three.Vector3)
	{
		this.highlights.TogglePlaneHighlight(this.scene, planeNormal);
	}

	public CameraNormal() : Three.Vector3
	{
		let direction = new Three.Vector3(this.activeCamera.position.x, this.activeCamera.position.y, -this.activeCamera.position.z);
		return direction.normalize();
	}

	public UsePerspectiveCamera() : void
	{
		this.activeCamera = this.perspectiveCamera;
	}

	public UseOrthographicCamera() : void
	{
		this.activeCamera = this.orthographicCamera;
	}

	public RenderContinuously() : void
	{
		if (!this.stopRender)
		{
			requestAnimationFrame(this.RenderContinuously);
			this.stopRender = false;
		}
		
		this.Render();
	}

	public StopRendering()
	{
		this.stopRender = true;
	}

	public RenderOnce() : void
	{
		this.Render();
	}

	protected Render()
	{
		this.activeCamera.lookAt(0,0,0);

		this.directionalLight.position.copy(this.activeCamera.position);
		this.directionalLight.lookAt(0,0,0);

		this.renderer.render(this.scene, this.activeCamera);
	}

	Element() : JQuery<HTMLElement>
	{
		return $(this.renderer.domElement);
	}
}