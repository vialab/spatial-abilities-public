import { TaskDisplay, UserInterface } from "../../io";

export class ExclusionForm extends TaskDisplay
{
	public IsExcluded = false;

	public Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		
		if (this.IsExcluded)
			screen.ContentContainer().append("<p>Based on your responses, you are inegligible to complete this study. Thank you for your interest.</p>");
	}
}