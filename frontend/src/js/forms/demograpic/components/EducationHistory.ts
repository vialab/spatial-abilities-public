import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class EducationHistory extends DemographicFormComponent
{
	entries : EducationEntry[] = [];

	degreeInput : JQuery<HTMLElement>;
	specialtyInput : JQuery<HTMLElement>;
	statusInput : JQuery<HTMLElement>;
	yearsInput : JQuery<HTMLElement>;

	constructor()
	{
		super(
		`<div>
			<p>Please list all of your post-secondary degrees in the following table:</p>
			<table class="w3-table w3-border w3-striped" style="width: 100%">
				<th>
					<tr class="w3-green">
						<td><b>Degree</b></td>
						<td><b>Specialty</b></td>
						<td><b>Status</b></td>
						<td></td>
					</tr>
				</th>
				<tr>
					<td>
						<input id="educationDegree" name="educationDegree" type="text" />
					</td>
					<td>
						<input id="educationSpecialty" name="educationSpecialty" type="text" />
					</td>
					<td>
						<select id="educationStatus">
							<option value="1">In Progress</option>
							<option value="2">Complete</option>
						</select><br />
						<input id="educationProgressYears" style="width: 75px;" type="text" name="educationprogressyears" /> Years
					</td>
					<td><button id="addEducation" class="w3-button w3-teal">+ Add</button></td>
				</tr>
			</table>
			<p id="educationInputError" style="color: red;"></p>
		</div>`
		);

		this.degreeInput = this.element.find("#educationDegree");
		this.specialtyInput = this.element.find("#educationSpecialty");
		this.statusInput = this.element.find("#educationStatus");
		this.yearsInput = this.element.find("#educationProgressYears");

		let addButton = this.element.find("#addEducation");
		addButton.click(() =>
		{
			let degree : string = (<string>this.degreeInput.val()).trim();
			let specialty : string = (<string>this.specialtyInput.val()).trim();
			let isInProgress : boolean = this.statusInput.find("option:selected").val() == "1";
			let yearsInputValue : string = (<string>this.yearsInput.val()).trim();
			let years : number = yearsInputValue || isInProgress? parseFloat(yearsInputValue) : 0;

			if (!degree)
			{
				this.ShowErrorMessage("Degree is required");
				return;
			}
			else if (!specialty)
			{
				this.ShowErrorMessage("Specialty is required");
				return;
			}
			else if (isNaN(years))
			{
				this.ShowErrorMessage("Invalid years value");
				return;
			}

			let entry = new EducationEntry(degree, specialty, !isInProgress, years);
			this.pushEntry(entry);
			
			this.resetInputs();
		});
	}

	private ShowErrorMessage(msg : string)
	{
		this.element.find("#educationInputError").html(msg);
	}

	private pushEntry(entry : EducationEntry)
	{
		this.entries.push(entry);
		let template = this.entryTemplate(entry);
		this.element.find("tr:last").before(template);
	}

	private entryTemplate(entry : EducationEntry) : JQuery<HTMLElement>
	{
		let row = $(
		`<tr id="educationHistory_${this.entries.length-1}">
			<td>${entry.Degree}</td>
			<td>${entry.Specialty}</td>
			<td>${entry.IsCompleted? "Complete" : "In Progress"}${entry.Years? "<br />("+entry.Years+" years)" : ""}</td>
			<td><button class="w3-button w3-deep-purple">- Remove</button></td>
		</tr>`
		);

		let removeButton = row.find("button");
		removeButton.click(() =>
		{
			for (let i = 0; i < this.entries.length; i++)
			{
				let current = this.entries[i];
				if (current == entry)
				{
					this.entries.splice(i, 1);
					break;
				}
			}

			row.remove();
		});

		return row;
	}

	private resetInputs()
	{
		this.degreeInput.val("");
		this.specialtyInput.val("");
		this.yearsInput.val("");
		this.ShowErrorMessage("");
	}

	public ShowRequiredFieldError()
	{
		super.ShowRequiredFieldError();
	}

	public Value() : any
	{
		return this.entries;
	}
}

class EducationEntry
{
	public Degree : string;
	public Specialty : string;
	public IsCompleted : boolean;
	public Years : number;

	constructor(degree : string, specialty : string, isInProgress : boolean, years : number)
	{
		this.Degree = degree;
		this.Specialty = specialty;
		this.IsCompleted = isInProgress;
		this.Years = years;
	}
}