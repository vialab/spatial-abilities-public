import { Vector3, Vector2 } from "three";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";

export class RandomPlane
{
	public static Select() : Vector3
	{
		let planeIndex = Math.round((GraphPlaneNormals.ALL.length-1) * Math.random());
		let plane = GraphPlaneNormals.ALL[planeIndex];

		return plane;
	}

}