import {Timer} from "./Timer";

export class UnlimitedTimer extends Timer
{
	public TickCallback : () => void;

	constructor()
	{
		super();
		this.TickCallback = () => {};
	}

	Tick() : void
	{
		this.TickCallback();
	}

	Progress(): number
	{
		return 0;
	}

	ElapsedTime()
	{
		return Date.now() - this.startTime;
	}
}