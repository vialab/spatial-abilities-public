import * as Three from "three";

export interface ThreeJsComponent
{
	Component() : Three.Object3D;
	Dispose() : void;
}