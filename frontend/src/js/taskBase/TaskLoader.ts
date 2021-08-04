import { Task } from ".";
import { SerializedTask } from "./SerializedTask";

export abstract class TaskLoader
{	
	constructor()
	{
	}

	public abstract Create() : Promise<Task>;
	public abstract Serialize() : SerializedTask;

	public abstract ReturnedType() : number;
}