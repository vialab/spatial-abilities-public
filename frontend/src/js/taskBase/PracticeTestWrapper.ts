import { Task } from ".";
import { TaskDisplay, UserInterface } from "../io";
import { ResultLog, OptionLog } from "../metrics/ResultLog";
import { SerializedTask } from "./SerializedTask";

export class PracticeTestWrapper extends Task
{
	private practiceTask : Task;
	private displayWrapper : PracticeTaskDisplayWrapper;

	private isFirstSubmit : boolean;

	constructor(task : Task)
	{
		let displayWrapper = new PracticeTaskDisplayWrapper(task.Display);
		super(displayWrapper, task.Controller);
		this.practiceTask = task;
		this.displayWrapper = displayWrapper;
		this.isFirstSubmit = true;

		this.copyFields(task);
	}

	public async Initialize() : Promise<void>
	{
		await this.practiceTask.Initialize();
	}

	public Dispose() : void
	{
		this.practiceTask.Dispose();
	}

	public Serialize() : SerializedTask
	{
		return this.practiceTask.Serialize();
	}

	public SetValues(task : SerializedTask) : void
	{
		this.practiceTask.SetValues(task);
	}

	public Submit(): void
	{
		if (this.isFirstSubmit)
		{
			this.isFirstSubmit = false;

			let isCorrect = this.evaluateCorrectness();
			this.displayWrapper.ShowResults(isCorrect);
		}
		else
		{
			this.practiceTask.Submit();
		}
	}

	private copyFields(task : Task)
	{
		this.Metadata = task.Metadata;
		this.ShowProgress = task.ShowProgress;
		this.Order = task.Order;
		this.Type = task.Type;
		this.OverrideIntermediateScreen = task.OverrideIntermediateScreen;
		this.SetTitle(task.GetTitle());
		this.SetPrompt(task.GetPrompt());
		this.SetTimer(task.GetTimer());
		this.SetCofidenceTracked(task.IsConfidenceTracked());
		this.SetResultsTracked(task.IsResultsTracked());
		this.SetExplicitSubmissionRequired(task.IsExplicitSubmissionRequired());
		this.IsPractice = task.IsPractice;
	}

	private evaluateCorrectness() : boolean
	{
		let isCorrect : boolean = true;

		let log = new ResultLog();
		this.practiceTask.LogResults(log);
		let task = log.Tests[0];

		if (task != null)
		{
			isCorrect = task.Options.reduce(
				(correct : boolean, option : OptionLog) => option.CorrectState == option.SelectedState && correct,
				isCorrect
			);
		}

		return isCorrect;
	}

	public LogResults(log: ResultLog): void
	{
		this.practiceTask.LogResults(log);
	}
}

class PracticeTaskDisplayWrapper extends TaskDisplay
{
	private wrappedDisplay : TaskDisplay;
	private activeScreen : UserInterface | null = null;

	constructor(wrapDisplay : TaskDisplay)
	{
		super();
		this.wrappedDisplay = wrapDisplay;
	}

	public ShowResults(isCorrect : boolean)
	{
		if (this.activeScreen != null)
		{
			if (isCorrect)
			{
				this.activeScreen.SetPrompt("Your answer was correct");
			}
			else
			{
				this.activeScreen.SetPrompt("Your answer was incorrect");
			}
			
			this.activeScreen.OptionsContainer().html("");
			this.activeScreen.SubmitButton().html("Next");
			this.activeScreen.ShowSubmitButton();
		}
	}

	public Display(screen: UserInterface): void
	{
		this.activeScreen = screen;
		this.wrappedDisplay.Display(screen);
	}
}