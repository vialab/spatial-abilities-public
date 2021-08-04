import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class VisualArtTimeSpent extends DemographicFormComponent
{
	constructor(followUpQuestion : DemographicFormComponent)
	{
		super(
		`<div>
			<p>
				On average, how much time (hours/week) do you spend making visual art?
			</p>
			<input type="radio" name="visualart" id="visualart-1" value="1"/>
			<label for="visualart-1">0 h/week</label>
			<br />
			<input type="radio" name="visualart" id="visualart-2" value="2"/>
			<label for="visualart-2">&lt;1 h/week</label>
			<br />
			<input type="radio" name="visualart" id="visualart-3" value="3"/>
			<label for="visualart-3">1-2 h/week</label>
			<br />
			<input type="radio" name="visualart" id="visualart-4" value="4"/>
			<label for="visualart-4">2-5 h/week</label>
			<br />
			<input type="radio" name="visualart" id="visualart-5" value="5"/>
			<label for="visualart-5">&gt;5 h/week</label>
		</div>`
		);

		this.Element().find('input[type="radio"]').click(() =>
		{
			if (this.Value() == 1)
			{
				followUpQuestion.Element().hide();
				followUpQuestion.SetRequired(false);
			}
			else
			{
				followUpQuestion.Element().show();
				followUpQuestion.SetRequired(true);
			}
				
		});
	}

	public Value() : any
	{
		return Number.parseInt(<string>$("input[name=visualart]:checked").val());
	}
}