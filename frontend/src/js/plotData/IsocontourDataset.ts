import { Dataset } from "./Dataset";

export interface IsocontourDataset extends Dataset
{
	Theta : number;
	Phi : number;
}