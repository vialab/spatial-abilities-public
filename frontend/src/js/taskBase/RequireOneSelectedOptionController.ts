import { Option, TaskController } from ".";


export class RequireOneSelectedOptionController extends TaskController
{
	public NoneSelectedMessage = "Select an option";

	public Submit(selectedOptions: Option | Option[]): void
	{
		let isOneSelected : boolean = false;

		if (selectedOptions instanceof Option)
		{
			isOneSelected = this.isSelected(selectedOptions);
		}
		else
		{
			for (let i = 0; i < selectedOptions.length && !isOneSelected; i++)
			{
				isOneSelected = this.isSelected(selectedOptions[i]);
			}
		}

		if (!isOneSelected)
		{
			this.throwNoneSelected();	
		}
		else
		{
			this.Complete();
		}
	}

	private isSelected(option : Option) : boolean
	{
		return option.GetCurrentState() != 0;
	}

	private throwNoneSelected()
	{
		throw new Error(this.NoneSelectedMessage);
	}
}