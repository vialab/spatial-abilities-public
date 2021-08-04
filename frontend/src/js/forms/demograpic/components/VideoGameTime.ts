import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class VideoGameTime extends DemographicFormComponent
{
	constructor(followUpQuestion : DemographicFormComponent)
	{
		super(
		`<div>
			<p>
				On average, how much time (hours/week) do you spend playing video games?
			</p>
			<input type="radio" name="videogames" id="videogames-1" value="1">
			<label for="videogames-1">0 h/week</label>
			<br />
			<input type="radio" name="videogames" id="videogames-2" value="2">
			<label for="videogames-2">&lt;1 h/week</label>
			<br />
			<input type="radio" name="videogames" id="videogames-3" value="3">
			<label for="videogames-3">1-2 h/week</label>
			<br />
			<input type="radio" name="videogames" id="videogames-4" value="4">
			<label for="videogames-4">2-5 h/week</label>
			<br />
			<input type="radio" name="videogames" id="videogames-5" value="5">
			<label for="videogames-5">&gt;5 h/week</label>
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
		return Number.parseInt(<string>$("input[name=videogames]:checked").val());
	}
}