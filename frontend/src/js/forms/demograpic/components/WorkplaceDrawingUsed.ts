import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class WorkplaceDrawingUsed extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>Do you make drawings or sketches for work?</p>
			<input type="radio" name="drawing" id="drawing-1" value="1">
			<label for="drawing-1">Yes</label>
			<br />
			<input type="radio" name="drawing" id="drawing-2" value="0">
			<label for="drawing-2">No</label>
		</div>`
		);
	}

	public Value() : any
	{
		return $("input[name=drawing]:checked").val() == "1";
	}
}