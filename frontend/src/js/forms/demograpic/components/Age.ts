import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class Age extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>What is your age?</p>
			<input type="text" name="age" />
		</div>`
		);
	}

	public Value() : any
	{
		return Number.parseFloat(<string>$("input[name=age]").val()?.toString().trim());
	}
}