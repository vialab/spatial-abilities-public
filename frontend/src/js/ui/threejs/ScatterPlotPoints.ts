import * as Three from "three";
import { Point } from "../../plotData/Point";
import { ThreeJsComponent } from "./ThreeJsComponent";

export class ScatterPlotPoints implements ThreeJsComponent
{
	private sphereGroup : Three.Group;
	private geometry : Three.SphereGeometry;
	private  material : Three.MeshBasicMaterial;

	//Static constructors to work around Typescript not allowing multiple constructors
	public static FromPoints(points : Point[], axisLength : number, pointRadius : number, padding : number = 0)
	{
		let sphere = new Three.SphereGeometry(pointRadius, 10, 10);
		let material = new Three.MeshBasicMaterial({color: 0x0033ff});
		material.opacity = 0.7;
		material.transparent = true;

		let element = new ScatterPlotPoints(sphere, material);
		element.createMesh(points, axisLength - padding);

		return element;
	}

	public static Clone(points : ScatterPlotPoints)
	{
		let element = new ScatterPlotPoints(points.geometry.clone(), points.material.clone());
		element.sphereGroup = points.sphereGroup.clone();
		return element;
	}

	private constructor(geometry : Three.SphereGeometry, material : Three.MeshBasicMaterial)
	{
		this.sphereGroup = new Three.Group();
		this.geometry = geometry;
		this.material = material;
	}

	public Dispose()
	{
		this.geometry.dispose();
		this.material.dispose();
	}

	private createMesh(positions : Point[], axisLength : number)
	{
		let maxAxisValue = axisLength/2;

		for (let i = 0; i < positions.length; i++)
		{
			let point = positions[i];
			let worldX = point.X * maxAxisValue;
			let worldY = point.Y * maxAxisValue;
			let worldZ = point.Z * maxAxisValue;

			var sphere = new Three.Mesh(this.geometry, this.material);
			sphere.position.set(worldX, worldY, worldZ);

			this.sphereGroup.add(sphere);
		}
	}

	public Component() : Three.Object3D
	{
		return this.sphereGroup;
	}
}