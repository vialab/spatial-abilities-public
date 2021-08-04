import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class WorkplaceDrawingImportance extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>
				To what extent do you agree with the following statement?<br />
				<br />
				<i>Drawings and sketches are important to my work.</i>
			</p>
			<div style="display: flex; flex-direction: row;" class="center-content">
				<div style="flex: 1;">
					<input type="radio" name="drawingimportance" id="drawingimportance-0" value="1"/>
					<label for="drawingimportance-0">Strongly Disagree</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="drawingimportance" id="drawingimportance-1" value="2"/>
					<label for="drawingimportance-1">Disagree</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="drawingimportance" id="drawingimportance-2" value="3"/>
					<label for="drawingimportance-2">Neutral</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="drawingimportance" id="drawingimportance-3" value="4"/>
					<label for="drawingimportance-3">Agree</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="drawingimportance" id="drawingimportance-4" value="5"/>
					<label for="drawingimportance-4">Strongly Agree</label>
				</div>
			</div>
		</div>`
		);
	}

	public Value() : any
	{
		return Number.parseInt(<string>$("input[name=drawingimportance]:checked").val());
	}
}