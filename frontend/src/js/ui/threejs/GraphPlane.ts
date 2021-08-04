import { ThreeJsComponent } from "./ThreeJsComponent";
import { Object3D, Vector3, BufferGeometry, Color, BufferAttribute, Mesh, DoubleSide, MeshPhongMaterial, MeshStandardMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshToonMaterial, MeshNormalMaterial, Material } from "three";
import Delaunator = require("delaunator");
import { Point } from "../../plotData/Point";

export class GraphPlane implements ThreeJsComponent
{
	private mesh : Mesh;
	private geometry : BufferGeometry;
	private material : Material;

	public static FromPoints(points : Point[], axisLength : number)
	{
		let maxValue = axisLength/2;

		let vectors = [];
		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			vectors.push(new Vector3(point.X * maxValue, point.Y * maxValue, point.Z * maxValue));
		}

		let indices = Delaunator.from(
			vectors,
			(v:Vector3) => v.x,
			(v:Vector3) => v.z
		);
		
		let geometry = new BufferGeometry();
		geometry.setFromPoints(vectors);
		geometry.setIndex(new BufferAttribute(indices.triangles, 1, false));
		geometry.computeVertexNormals();

		let colors = new Uint8Array(vectors.length*3);
		let ramp = new ColorRamp(-maxValue, maxValue)

		for (let i = 0; i < vectors.length; i++)
		{
			let colorIndex = i*3;

			let point = vectors[i];
			let color = ramp.Color(point.y);
			
			colors[colorIndex] = color.r;
			colors[colorIndex+1] = color.g;
			colors[colorIndex+2] = color.b;
		}
		
		geometry.setAttribute("color", new BufferAttribute(colors, 3, true));

		var vertexColorMaterial  = new MeshPhongMaterial( { vertexColors: true, side: DoubleSide, reflectivity: 0 } );
		let mesh = new Mesh( geometry, vertexColorMaterial );

		let plane = new GraphPlane(mesh, geometry, vertexColorMaterial);

		return plane;
	}

	public static Clone(plane : GraphPlane) : GraphPlane
	{
		let copy = new GraphPlane(
			plane.mesh.clone(),
			plane.geometry.clone(),
			plane.material.clone()
		);
		
		return copy;
	}

	private constructor(mesh : Mesh, geometry : BufferGeometry, material : Material)
	{
		this.mesh = mesh;
		this.geometry = geometry;
		this.material = material;
	}

	public Dispose()
	{
		this.material.dispose();
		this.geometry.dispose();
	}

	Component(): Object3D
	{
		return this.mesh;
	}
}

class ColorRamp
{
	private minValue : number;
	private maxValue : number;
	private valueRange : number;

	private colors : Color[];

	constructor(minValue : number, maxValue : number)
	{
		this.minValue = minValue;
		this.maxValue = maxValue;
		this.valueRange = maxValue - minValue;
		
		// this.colors = [
		// 	new Color(43, 131, 86),
		// 	new Color(171, 221, 164),

		// 	new Color(225, 225, 150),
		// 	// new Color(255, 255, 191),
			
		// 	new Color(253, 174, 97),
		// 	new Color(215, 25, 28),
		// ];

		this.colors = [
			new Color(179,88,6),
			new Color(241,163,64),
			new Color(254,224,182),
			new Color(216,218,235),
			new Color(153,142,195),
			new Color(84,39,136)
		];
	}

	public Color(value : number) : Color
	{
		if (value == this.maxValue)
			return new Color(this.colors[this.colors.length-1]);

		let percentageOfMaximum = (value - this.minValue) / this.valueRange;
		let unroundedIndex = percentageOfMaximum * (this.colors.length-1);
		let floorIndex = Math.floor(unroundedIndex);
		let lerpPercentage = unroundedIndex % 1;

		//Move the index back by 1 if it's the last element of the array
		// Shouldn't happen but can happen due to rounding errors
		if (floorIndex == this.colors.length - 1)
		{
			floorIndex--;
			console.log(floorIndex);
		}
		
		let colorFloor = this.colors[floorIndex];
		let colorCeil = this.colors[floorIndex == this.colors.length-1? floorIndex : floorIndex+1];

		let result = new Color(colorFloor);
		result.lerp(colorCeil, lerpPercentage);

		return result;
	}
}