import {Timer} from "./Timer";
import {Task} from "../../taskBase";

export class LimitedTimer extends Timer
{
	private elapsedTime : number = 0;
	private duration : number;
	private task : Task;
	private tickInterval : number = 10;
	protected isActive : boolean = false;

	constructor(task : Task, duration: number)
	{
		super();
		this.task = task;
		this.duration = duration;
	}

	public Start()
	{
		super.Start();
		this.isActive = true;

		let previous = Date.now();

		let tick = () =>
		{
			var now = Date.now();
			var expectedTime = previous + this.tickInterval;
			var differenceFromExpected = now - expectedTime;
			
			var deltaTime = now - previous - differenceFromExpected;

			this.elapsedTime += deltaTime;

			this.Tick();
			
			if (this.isActive)
				setTimeout(tick, this.tickInterval);
		};

		setTimeout(tick, this.tickInterval);
	}

	public Stop()
	{
		this.isActive = false;
		super.Stop();
	}

	public ElapsedTime()
	{
		return this.elapsedTime;
	}

	public Tick()
	{
		super.Tick();

		if (this.Progress() >= 100)
		{
			this.Stop();
			this.task.Controller.Complete();
		}
	}

	public Progress(): number
	{
		let progress : number = this.startTime == 0? 0 : (this.ElapsedTime() / this.duration) * 100;
		progress = progress > 100? 100 : progress;

		return progress;
	}
}