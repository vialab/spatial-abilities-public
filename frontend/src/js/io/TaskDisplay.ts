import {UserInterface} from "./UserInterface";

export abstract class TaskDisplay
{
	public abstract Display(screen : UserInterface) : void;
	public Dispose()
	{
		
	}
}