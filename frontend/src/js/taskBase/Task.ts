import {TaskDisplay} from "../io";
import {TaskController} from "./TaskController";
import { Timer, UnlimitedTimer, GraphRotationTracker } from "../metrics";
import { ResultLog, TestLog, OptionLog, RotationLog, RotationInstanceLog } from "../metrics/ResultLog";
import { SerializedTask } from "./SerializedTask";
import { Option } from ".";

export abstract class Task
{
	public Metadata : any = {};

	public Display : TaskDisplay;
	public Controller : TaskController;

	public ShowProgress : boolean = false;

	public Order : number = -1;
	public Type : number = -1;

	public OverrideIntermediateScreen : boolean = false;

	private title : string;
	private prompt : string;
	private timer : Timer;
	private trackConfidence : boolean;
	private trackResults : boolean;
	private explicitSubmissionRequired : boolean;

	public IsPractice : boolean = false;

	private confidence : number = 0;
	
	constructor(display : TaskDisplay, controller : TaskController)
	{
		this.Display = display;
		this.Controller = controller;

		this.title = "";
		this.prompt = "";
		this.timer = new UnlimitedTimer();
		this.trackConfidence = false;
		this.trackResults = false;
		this.explicitSubmissionRequired = false;
	}

	
	public abstract Submit() : void;
	public abstract LogResults(log : ResultLog) : void;

	public async Finish() : Promise<void>
	{
	}

	public async Initialize() : Promise<void>
	{
		return;
	}

	public Dispose()
	{
		this.Display.Dispose();
	}

	public SetTitle(title : string) : void
	{
		this.title = title;
	}

	public GetTitle() : string
	{
		return this.title;
	}

	public SetPrompt(prompt : string) : void
	{
		this.prompt = prompt;	
	}
	public GetPrompt() : string
	{
		return this.prompt;
	}

	public SetTimer(timer : Timer) : void
	{
		this.timer = timer;
	}
	public GetTimer() : Timer
	{
		return this.timer;
	}

	public SetCofidenceTracked(track : boolean) : void
	{
		this.trackConfidence = track;	
	}
	public IsConfidenceTracked() : boolean
	{
		return this.trackConfidence;
	}

	public SetExplicitSubmissionRequired(submit : boolean) : void
	{
		this.explicitSubmissionRequired = submit;
	}
	public IsExplicitSubmissionRequired() : boolean
	{
		return this.explicitSubmissionRequired;
	}

	public SetResultsTracked(track : boolean) : void
	{
		this.trackResults = track;	
	}
	public IsResultsTracked() : boolean
	{
		return this.trackResults;
	}

	public SetConfidence(confidence : number) : void
	{
		this.confidence = confidence;
	}
	public GetConfidence() : number
	{
		return this.confidence;
	}

	public Serialize() : SerializedTask
	{
		return {
			Name: this.constructor.name,
			DatasetName: "",
			IsPractice: this.IsPractice,
			Metadata: {}
		};
	}

	public SetValues(serialization : SerializedTask) : void
	{
		this.IsPractice = serialization.IsPractice;
	}

	public ApplyPracticeProperties()
	{
		this.IsPractice = true;
		this.SetCofidenceTracked(false);
		this.SetResultsTracked(false);
		this.SetTimer(new UnlimitedTimer());
		this.SetTitle("Sample Test");
		this.SetPrompt("&#9888; This is an example of the test you are about to do. Results of this test are not tracked.<br />" + this.GetPrompt());
	}

	protected CreateLog() : TestLog
	{
		let log = new TestLog();
		log.Type = this.Type;
		log.Order = this.Order;
		log.Duration = this.timer.ElapsedTime();
		log.Metadata = this.Metadata;
		return log;
	}

	protected CreateOptionLogs(options : Option[])
	{
		return options.map((o) => {
			let loggedOption = new OptionLog();

			loggedOption.Name = o.Name;
			loggedOption.CorrectState = o.CorrectState;
			loggedOption.SelectedState = o.GetCurrentState();

			return loggedOption;
		});
	}

	protected CreateRotationLogs(tracker : GraphRotationTracker)
	{
		return tracker.GetInteractionHistory().map(r =>
		{
			let log = new RotationLog();
			log.Id = r.Id;
			log.InitialOffset = tracker.GetInitialRotation();

			log.Instances = r.Rotations.map(i =>
			{
				let instance = new RotationInstanceLog();

				instance.InteractionId = log.Id;
				instance.DeltaTime = i.DeltaTime;
				instance.x = i.Current.x;
				instance.y = i.Current.y;

				return instance;
			});
			
			return log;
		});
	}
}