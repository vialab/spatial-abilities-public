import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class WorkplaceGraphicsLikert extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>
				To what extent do you agree with the following statement?<br />
				<br />
				<i>Graphical representations of information are important to my work.</i>
			</p>
			<div style="display: flex; flex-direction: row;" class="center-content">
				<div style="flex: 1;">
					<input type="radio" name="workgraphics" id="workgraphics-0" value="1"/>
					<label for="workplacegraphics=0">Strongly Disagree</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="workgraphics" id="workgraphics-1" value="2"/>
					<label for="workgraphics-1">Disagree</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="workgraphics" id="workgraphics-2" value="3"/>
					<label for="workgraphics-2">Neutral</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="workgraphics" id="workgraphics-3" value="4"/>
					<label for="workgraphics-3">Agree</label>
				</div>
				<div style="flex: 1;">
					<input type="radio" name="workgraphics" id="workgraphics-4" value="5"/>
					<label for="workgraphics-4">Strongly Agree</label>
				</div>
			</div>
		</div>`
		);
	}

	public Value() : any
	{
		return Number.parseInt(<string>$("input[name=workgraphics]:checked").val());
	}
}