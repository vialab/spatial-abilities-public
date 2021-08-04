import { Vector2, Vector3 } from "three";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";

export class PlaneRotation
{
	public static RotationFor(normal : Vector3) : Vector2
	{
		if (normal.equals(GraphPlaneNormals.UP))
			return new Vector2(0, 0);
		else if (normal.equals(GraphPlaneNormals.DOWN))
			return new Vector2(180, 0);
		else if (normal.equals(GraphPlaneNormals.LEFT))
			return new Vector2(90, 270);
		else if (normal.equals(GraphPlaneNormals.RIGHT))
			return new Vector2(90, 90);
		else if (normal.equals(GraphPlaneNormals.AWAY))
			return new Vector2(90, 180);
		else if (normal.equals(GraphPlaneNormals.TOWARDS))
			return new Vector2(90, 0);
		
		throw new Error("normal must be a constant contained in PlotNormals.ALL");
	}
}