import { SerializedTask } from "./taskBase/SerializedTask";

export interface TestOrder
{
	Name : string;
	Tests : SerializedTask[];
}