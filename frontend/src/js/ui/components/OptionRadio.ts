import { Option } from "../Option";
import { IdGenerator } from "../../util/IdGenerator";
import { OptionLog } from "../../metrics/ResultLog";

export class OptionRadio extends Option
{
	private element : JQuery<HTMLElement>;

	public static CreateGroup(amount : number) : OptionRadio[]
	{
		let groupName = IdGenerator.Generate();
		let options : OptionRadio[] = [];

		for (let i = 0; i < amount; i++)
		{
			options.push(new OptionRadio(i, "", 0, groupName));
		}

		return options;
	}

	private constructor(id : number, name : string, expectedState : number, group : string)
	{
		super(id, name, expectedState);
		this.element = $(`<input type="radio" name="${group}" value="1"> ${name}`);
		this.element.click(() =>
		{
			this.SetCurrentState(
				this.element.prop("checked")? 1 : 0
			);
		});
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}

	public Log() : OptionLog
	{
		return {
			Name: "" + this.Id,
			SelectedState: this.GetCurrentState(),
			CorrectState: this.CorrectState
		}
	}
}