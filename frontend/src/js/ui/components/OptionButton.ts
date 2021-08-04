import { Option } from "../Option";
import { OptionLog } from "../../metrics/ResultLog";
import { ApplicationState } from "../../ApplicationState";

export class OptionButton extends Option
{
	private submitOnClick : boolean;
	private element : JQuery<HTMLElement>;

	constructor(id : number, name : string, expectedState : number, submitOnClick : boolean = false)
	{
		super(id, name, expectedState);
		this.OnStateChanged = (button) => {};
		this.element = $(`<button type="button" class="btn btn-primary">${this.Name}</button>`);
		this.submitOnClick = submitOnClick;

		this.element.click(() =>
		{
			this.SetCurrentState(1);

			if (this.submitOnClick)
			{
				ApplicationState.CurrentTask.Submit();
			}
		});
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}

	public Log() : OptionLog
	{
		return {
			Name : this.Name,
			SelectedState: this.GetCurrentState(),
			CorrectState: this.CorrectState
		};
	}
}