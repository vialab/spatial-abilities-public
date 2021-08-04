import {Option} from "../ui/Option";
import {TaskDisplay, UserInterface} from "../io";
import {Timer, UnlimitedTimer} from "../metrics";

export abstract class TaskController
{
	private promise : Promise<void>;
	protected resolve : () => any;
	protected reject : (reason : any) => any;
	
	constructor()
	{
		this.resolve = () => null;
		this.reject = (reason : any) => null;

		this.promise = new Promise<void>((resolve, reject) =>
		{
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	public async WaitForCompletion() : Promise<void>
	{
		return this.promise;
	}

	public Complete() : void
	{
		this.resolve();
	}

	Error(reason : any)
	{
		this.reject(reason);
	}

	public abstract Submit(selectedOptions : Option | Option[]) : void;
}

class NoDisplay extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
	}
}