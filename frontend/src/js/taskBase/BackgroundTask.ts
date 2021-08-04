import { Task } from ".";
import { EmptyTaskDisplay } from "./EmptyTaskDisplay";
import { EmptyTaskcontroller } from "./EmptyTaskController";

export abstract class BackgroundTask extends Task
{
	constructor()
	{
		super(new EmptyTaskDisplay(), new EmptyTaskcontroller());
		this.SetCofidenceTracked(false);
	}
}