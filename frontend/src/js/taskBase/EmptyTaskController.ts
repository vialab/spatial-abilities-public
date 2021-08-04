import { TaskController, Option } from ".";

export class EmptyTaskcontroller extends TaskController
{
	public Submit(selectedOptions: Option | Option[]): void
	{
		this.Complete();
	}
}