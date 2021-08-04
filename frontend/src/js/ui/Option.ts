import { UiElement } from "./UiElement";
import { OptionLog } from "../metrics/ResultLog";

export abstract class Option implements UiElement
{
	public OnStateChanged : (option : Option) => void;

	public Id: number;
	public Name : string;
	public CorrectState : number;

	private CurrentState : number = 0;

	constructor(id : number, name : string, correctState : number)
	{
		this.Id = id;
		this.Name = name;
		this.CorrectState = correctState;
		this.OnStateChanged = () => {};
	}

	GetCurrentState() : number
	{
		return this.CurrentState;
	}

	SetCurrentState(state : number)
	{
		this.CurrentState = state;
		this.OnStateChanged(this);

		// console.log("State changed to " + this.GetCurrentState());
	}

	abstract Element() : JQuery<HTMLElement>;
	abstract Log() : OptionLog;
}

export class NonDisplayOption extends Option
{
	Element(): JQuery<HTMLElement>
	{
		return $("");
	}
	Log(): OptionLog
	{
		return {
			Name : this.Name,
			SelectedState: this.GetCurrentState(),
			CorrectState: this.CorrectState
		};
	}
}