import { Conrec } from "../../lib/conrec/conrec";
import { Point } from "../../plotData/Point";
import {ThreeJsComponent} from "./ThreeJsComponent";
import { Object3D, Group, Vector3, Scene, WebGLRenderer, WebGLRenderTarget, AmbientLight, Color, OrthographicCamera, LineBasicMaterial, Geometry, Line, BufferGeometry, BufferAttribute } from "three";
import { GraphPlane } from "./GraphPlane";
import { Graph } from "../components/Graph";
import * as turf from "@turf/turf";

export class Isolines implements ThreeJsComponent
{
	private lineGroup : Group;
	private renderer : WebGLRenderer;
	private lineMaterial : LineBasicMaterial;
	private geometries : BufferGeometry[] = [];

	constructor(points : Point[], axisLength : number)
	{
		this.renderer = new WebGLRenderer();
		this.renderer.setSize(axisLength, axisLength);
		this.renderer.setClearColor(0xffffff);

		let thresholds : number[] = [];
		let NUM_THRESHOLDS = 20;
		let THRESHOLD_INCREMENT = 2/NUM_THRESHOLDS;
		for (let i = -1; i <= 1; i +=THRESHOLD_INCREMENT)
		{
			thresholds.push(i);
		}

		let pointsArray = [];
		for (let i = 0; i < points.length; i++)
		{
			let p = points[i];
			pointsArray.push(turf.point([p.X, p.Z], {Y: p.Y}));
		}
		let pointCollection = turf.featureCollection(pointsArray);
		let contour = turf.isolines(pointCollection, thresholds, {zProperty: "Y"});

		this.lineGroup = new Group();
		this.lineMaterial = new LineBasicMaterial( { linewidth: 3, vertexColors: true } );
		let highestAxisValue = axisLength/2;

		let heatmap = this.createTexture(points, axisLength);

		for (let i = 0; i < contour.features.length; i++)
		{
			let lines = contour.features[i].geometry?.coordinates || [];

			for (let l = 0; l < lines.length; l++)
			{
				let linePoints : Vector3[] = [];
				let averageColor : Color = new Color(0,0,0);
				let geometry = new BufferGeometry();

				let line = lines[l];
				for (let p = 0; p < line.length; p++)
				{
					let x = line[p][0];
					let z = line[p][1];

					let worldPoint = new Vector3(x*highestAxisValue, 0, z*highestAxisValue);
					let screenX = Math.round(worldPoint.x) + highestAxisValue;
					let screenY = Math.round(worldPoint.z) + highestAxisValue;

					screenX = screenX == axisLength? axisLength-1 : screenX;
					screenY = screenY == axisLength? axisLength-1 : screenY;
					
					let pointColor = heatmap[screenX][screenY];
					
					linePoints.push(worldPoint);

					averageColor.r += pointColor.r;
					averageColor.g += pointColor.g;
					averageColor.b += pointColor.b;
				}

				averageColor.r /= linePoints.length;
				averageColor.g /= linePoints.length;
				averageColor.b /= linePoints.length;

				let colors = new Uint8Array(linePoints.length*3);
				for (let i = 0; i < linePoints.length; i++)
				{
					let point = linePoints[i];
					
					let startIndex = i*3;
					colors[startIndex] = averageColor.r;
					colors[startIndex+1] = averageColor.g;
					colors[startIndex+2] = averageColor.b;
				}
				
				// let curve = new CatmullRomCurve3(linePoints, false, "centripetal", 1);
				geometry.setFromPoints(linePoints);
				geometry.setAttribute("color", new BufferAttribute(colors, 3, true));
				this.lineGroup.add(new Line(geometry, this.lineMaterial));
				this.geometries.push(geometry);
			}
		}
	}

	public Dispose()
	{
		this.renderer.dispose();
		this.lineMaterial.dispose();
		for (let i = 0; i < this.geometries.length; i++)
			this.geometries[i].dispose();
	}

	private createTexture(points : Point[], axisLength : number) : Color[][]
	{
		let target = new WebGLRenderTarget(axisLength, axisLength);
		let orthographicSideLength = axisLength/2;
		let orthographicCamera = new OrthographicCamera(
			-orthographicSideLength,
			orthographicSideLength,
			orthographicSideLength,
			-orthographicSideLength,
			0.1, axisLength * 3
		);
		orthographicCamera.position.z = axisLength;

		let scene = new Scene();
		let plane = GraphPlane.FromPoints(points, axisLength);

		let planeComponent = plane.Component();
		planeComponent.rotateX(1.5708);
		planeComponent.rotateY(1.5708);

		scene.add(planeComponent);
		scene.add(new AmbientLight(new Color(1,1,1), 1));

		this.renderer.render(scene, orthographicCamera);
		this.renderer.setRenderTarget(target);
		this.renderer.render(scene, orthographicCamera);

		const buffer = new Uint8Array(axisLength * axisLength * 4);
		this.renderer.readRenderTargetPixels(target, 0, 0, axisLength, axisLength, buffer);

		let colors : Color[][] = [];
		for (let x = 0; x < axisLength; x++)
		{
			let columnColors : Color[] = [];

			for (let y = 0; y < axisLength; y++)
			{
				let index = x*axisLength*4+y*4;
				let red = buffer[index];
				let green = buffer[index+1];
				let blue = buffer[index+2];

				columnColors.push(new Color(red, green, blue));
			}

			colors.push(columnColors);
		}

		target.dispose();
		scene.dispose();
		plane.Dispose();

		return colors;
	}

	Renderer()
	{
		return this.renderer;
	}
	
	Component(): Object3D
	{
		return this.lineGroup;
	}
}