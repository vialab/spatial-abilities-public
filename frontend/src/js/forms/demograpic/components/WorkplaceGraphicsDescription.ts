import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class WorkplaceGraphicsDescription extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>Please describe what graphical representations of information you use for your work.</p>
			<textarea id="workplaceGraphicsDescription" rows="4" cols="50"></textarea>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#workplaceGraphicsDescription").val();
	}
}