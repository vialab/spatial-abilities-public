import { TaskList, TaskFactory, Task } from "../taskBase";

export abstract class TestSessionStorage
{
	abstract Load() : Promise<TaskList>;
	abstract Save(list : TaskList) : void;	
	abstract Clear() : void;
}