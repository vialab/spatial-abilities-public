import { TaskDisplay, UserInterface } from "../../io";
import { FieldOfStudy } from "./components/FieldOfStudy";
import { EducationHistory } from "./components/EducationHistory";
import { EducationAtLeastBachelors } from "./components/EducationAtLeastBachelors";
import { WorkplaceGraphicsLikert } from "./components/WorkplaceGraphicsLikert";
import { WorkplaceGraphicsDescription } from "./components/WorkplaceGraphicsDescription";
import { WorkplaceDrawingUsed } from "./components/WorkplaceDrawingUsed";
import { WorkplaceDrawingImportance } from "./components/WorkplaceDrawingImportance";
import { VisualArtTimeSpent } from "./components/VisualArtTimeSpent";
import { VisualArtDescription } from "./components/VisualArtDescription";
import { VideoGameTime } from "./components/VideoGameTime";
import { VideoGameTypes } from "./components/VideoGameTypes";
import { Age } from "./components/Age";
import { Gender } from "./components/Gender";
import { DemographicFormComponent } from "./components/DemographicFormComponent";

export class DemographicForm extends TaskDisplay
{
	private fieldOfStudy = new FieldOfStudy();
	private educationHistory = new EducationHistory();
	private educationAtLeastBachelors = new EducationAtLeastBachelors();
	private workplaceGraphics = new WorkplaceGraphicsLikert();
	private workplaceGraphicsDescription = new WorkplaceGraphicsDescription();
	private workplaceDrawings = new WorkplaceDrawingUsed();
	private workplaceDrawingsImportance = new WorkplaceDrawingImportance();
	private visualArt : VisualArtTimeSpent;
	private visualArtTypes = new VisualArtDescription();
	private videoGames : VideoGameTime;
	private videoGamesDescription = new VideoGameTypes();
	private age = new Age();
	private gender = new Gender();

	private submit : () => void;

	private missingRequiredFieldsNotification : JQuery<HTMLElement>;

	private formData : DemographicFormData;

	constructor(submit : () => void)
	{
		super();

		this.visualArtTypes.Element().hide();
		this.visualArt = new VisualArtTimeSpent(this.visualArtTypes);

		this.videoGamesDescription.Element().hide();
		this.videoGames = new VideoGameTime(this.videoGamesDescription);

		this.formData = new DemographicFormData();

		this.submit = submit;
		this.missingRequiredFieldsNotification = $(
			`<div style="color: red">Missing required fields. Please look over the form and answer any question marked as required.</div>`
		);
		this.missingRequiredFieldsNotification.hide();

		this.fieldOfStudy.SetRequired(true);
		this.educationHistory.SetRequired(true);
		this.educationAtLeastBachelors.SetRequired(true);
		this.fieldOfStudy.SetRequired(true);
		this.educationHistory.SetRequired(true);
		this.workplaceGraphics.SetRequired(true);
		this.workplaceDrawings.SetRequired(true);
		this.workplaceDrawingsImportance.SetRequired(true);
		this.visualArt.SetRequired(true);
		this.videoGames.SetRequired(true);
		this.age.SetRequired(true);
		this.gender.SetRequired(true);
	}
	
	public Display(screen: UserInterface): void
	{
		let template = $(
		`<div class="center-content" style="max-height: 100%; width: 100%; overflow: scroll; padding-top: 25px;">
			<div id="formContainer" style="width: 900px; max-height: 100%;">
				<p>Please fill out this anonymous demographic survey.</p>
				<hr />
			</div>
		</div>`
		);

		let form = template.find("#formContainer");

		form.append(this.fieldOfStudy.Element());
		form.append("<hr/>");
		form.append(this.educationHistory.Element());
		form.append("<hr/>");
		form.append(this.educationAtLeastBachelors.Element());
		form.append("<hr/>");
		form.append(this.workplaceGraphics.Element());
		form.append("<hr/>");
		form.append(this.workplaceGraphicsDescription.Element());
		form.append("<hr/>");
		form.append(this.workplaceDrawings.Element());
		form.append("<hr/>");
		form.append(this.workplaceDrawingsImportance.Element());
		form.append("<hr/>");
		form.append(this.visualArt.Element());
		form.append(this.visualArtTypes.Element());
		form.append("<hr/>");
		form.append(this.videoGames.Element());
		form.append(this.videoGamesDescription.Element());
		form.append("<hr/>");
		form.append(this.age.Element());
		form.append("<hr/>");
		form.append(this.gender.Element());
		form.append("<hr/>");
		form.append(this.missingRequiredFieldsNotification);

		let submitButton = $(`<div id="submit-test" class="w3-button w3-green submit">Submit &raquo;</div>`);
		submitButton.click(() =>
		{
			let atLeastOneError = false;
			let keys = Object.keys(this);

			for (let i = 0; i < keys.length; i++)
			{
				let propertyKey : string = keys[i];
				let formField : any = (<any>this)[propertyKey];

				if (formField instanceof DemographicFormComponent)
				{
					let erroronous = (
							formField.IsRequired() && !formField.Value()
							|| Array.isArray(formField.Value()) && formField.Value().length == 0
						)
						&& formField.Value() !== false;

					if (erroronous)
					{
						formField.ShowRequiredFieldError();
					}
					else
					{
						formField.HideRequiredFieldError();
					}

					atLeastOneError = atLeastOneError || erroronous;
				}
			}

			if (!atLeastOneError)
			{
				this.missingRequiredFieldsNotification.hide();
				this.submit();
			}
			else
			{
				this.missingRequiredFieldsNotification.show();
			}
		});

		form.append(submitButton);

		screen.ViewModeContent();
		screen.ContentContainer().append(template);
	}

	public GetInputData() : DemographicFormData
	{
		return this.formData;
	}

	public StoreInputData()
	{
		this.formData.FieldOfStudy = parseInt(this.fieldOfStudy.Value());

		this.formData.EducationHistory = this.educationHistory.Value();
		this.formData.IsBachelorsAchieved = this.educationAtLeastBachelors.Value();
		this.formData.WorkplaceGraphicImportance = this.workplaceGraphics.Value();
		this.formData.WorkplaceGraphicDescription = this.workplaceGraphicsDescription.Value();
		this.formData.IsWorkplaceDrawingsUsed = this.workplaceDrawings.Value();
		this.formData.WorkplaceDrawingImportance = this.workplaceDrawingsImportance.Value();
		this.formData.TimeSpentMakingArt = this.visualArt.Value();
		this.formData.TypesOfArtMade = this.visualArtTypes.Value();
		this.formData.VideoGamesTimeSpent = this.videoGames.Value();
		this.formData.VideoGamesPlayed = this.videoGamesDescription.Value();

		//TODO catch non numeric input
		this.formData.Age = parseInt(this.age.Value());

		this.formData.Gender = this.gender.Value();
	}
}

export class DemographicFormData
{
	public FieldOfStudy : number | null = null;
	public EducationHistory : {Degree : string, Specialty : string, IsCompleted : boolean, Years : number}[] = [];
	public IsBachelorsAchieved : boolean | null = null;
	public WorkplaceGraphicImportance : number | null = null;
	public WorkplaceGraphicDescription : string = "";
	public IsWorkplaceDrawingsUsed : boolean | null = null;
	public WorkplaceDrawingImportance : number | null = null;
	public TimeSpentMakingArt : number | null = null;
	public TypesOfArtMade : string = "";
	public VideoGamesTimeSpent : number | null = null;
	public VideoGamesPlayed : string = "";
	public Age : number = 0;
	public Gender : string | null = null;
}