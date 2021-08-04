export abstract class Timer
{
	public TickCallback : () => void;
	protected startTime : number;

	constructor()
	{
		this.startTime = 0;
		this.TickCallback = () => {};
	}

	public Start() : void
	{
		this.startTime = Date.now();
	}

	public Stop() : void
	{
	}

	public Tick() : void
	{
		this.TickCallback();
	}

	abstract ElapsedTime() : number
	abstract Progress() : number;
}