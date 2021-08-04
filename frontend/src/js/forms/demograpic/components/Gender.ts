import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class Gender extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>What is your gender?</p> 

			<input type="radio" name="gender" id="gender-1" value="Male">
			<label for="gender-1">Male</label>
			<br />
			<input type="radio" name="gender" id="gender-2" value="Female">
			<label for="gender-2">Female</label>
			<br />
			<input type="radio" name="gender" id="gender-3" value="Non-binary">
			<label for="gender-3">Non-binary</label>
			<br />
			<input type="radio" name="gender" id="gender-4" value="sd">
			<label for="gender-4">Self-disclose (fill in)</label>
			<input type="text" id="gender-sd" name="gender-sd" />
			<br />
			<input type="radio" name="gender" id="gender-5" value="Prefer not to disclose">
			<label for="gender-5">Prefer not to disclose</label>
		</div>`
		);
	}

	public Value() : any
	{
		let value = $("input[name=gender]:checked").val();
		return (value == "sd")? $("#gender-sd").val()?.toString().trim() : value;
	}
}