import { Task } from "../taskBase";
import { TaskDisplay, UserInterface } from "../io";
import { EmptyTaskcontroller } from "../taskBase/EmptyTaskController";
import { SerializedTask } from "../taskBase/SerializedTask";
import { ResultLog } from "../metrics/ResultLog";

export class AfterFirstTask extends Task
{
	constructor()
	{
		super(new AfterFirstTaskWindow(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public Submit(): void
	{
		this.Controller.Complete();
	}

	public LogResults(log: ResultLog): void
	{
	}
}

class AfterFirstTaskWindow extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
		screen.ContentContainer().append(
			`<p style="margin-top: 15px;">`
			+ "Thank you for completing the first task in this study. You will now move on to other tasks.<br />"
			+ "Please feel free to take a break at this point while leaving your browser window open.<br />"
			+ "Click the below button when you are ready to continue with the remainder of the study."
			+ "</p>"
		);

		screen.SubmitButton().html("Begin &raquo;");

		screen.ViewModeContent();
	}
}