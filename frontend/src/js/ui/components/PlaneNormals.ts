import * as Three from "three";
import { Vector3, Matrix4, Matrix3 } from "three";

export default class GraphPlaneNormals
{
	static TOWARDS = new Three.Vector3(0,0,1);
	static AWAY = new Three.Vector3(0,0,-1);

	static UP = new Three.Vector3(0,1,0);
	static DOWN = new Three.Vector3(0,-1,0);

	static RIGHT = new Three.Vector3(1,0,0);
	static LEFT = new Three.Vector3(-1,0,0);

	static ALL = [
		GraphPlaneNormals.TOWARDS,
		GraphPlaneNormals.AWAY,
		GraphPlaneNormals.UP,
		GraphPlaneNormals.DOWN,
		GraphPlaneNormals.RIGHT,
		GraphPlaneNormals.LEFT
	];
};