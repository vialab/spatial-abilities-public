import * as Three from "three";
import GraphPlaneNormals from "../components/PlaneNormals";
import { ThreeJsComponent } from "./ThreeJsComponent";

export class WireframeCube implements ThreeJsComponent
{
	private frameMaterial = new Three.MeshBasicMaterial({color: 0x000000});
	private cubeGeometry : Three.BoxGeometry;
	private edgeGeometry : Three.EdgesGeometry;
	private edgeLength : number;
	private wireFrame : Three.LineSegments;

	constructor(edgeLength : number)
	{
		this.edgeLength = edgeLength;

		this.cubeGeometry = new Three.BoxGeometry(this.edgeLength, this.edgeLength, this.edgeLength);
		this.edgeGeometry = new Three.EdgesGeometry(this.cubeGeometry);
		this.wireFrame = new Three.LineSegments(this.edgeGeometry, this.frameMaterial);
		this.wireFrame.position.set(0, 0, 0);
	}

	public Dispose()
	{
		this.edgeGeometry.dispose();
		this.cubeGeometry.dispose();
		this.frameMaterial.dispose();
	}

	public Component() : Three.Object3D
	{
		return this.wireFrame;
	}
}