import { Task, Option } from "../taskBase";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";
import { TaskController } from "../taskBase/TaskController";
import { CompensationLog, ResultLog } from "../metrics/ResultLog";
import { Backend } from "../Backend";
import { SerializedTask } from "../taskBase/SerializedTask";
import { EmptyTaskcontroller } from "../taskBase/EmptyTaskController";

declare var grecaptcha : any;

export class ContactInformation extends Task
{
	constructor(backend : Backend, log : ResultLog, globalTimer : Timer)
	{
		let display = new ContactInformationDisplay(
			backend,
			log,
			() => this.Controller.Complete()
		);

		log.TotalTime = globalTimer.ElapsedTime();

		super(display, new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(false);
		this.SetResultsTracked(true);
		this.OverrideIntermediateScreen = true;
	}

	public async Submit()
	{
	}
	
	public LogResults(log : ResultLog) : void
	{
	}
}

class ContactInformationDisplay extends TaskDisplay
{
	private form : JQuery<HTMLElement>
	private nameInput  : JQuery<HTMLElement>;
	private emailInput : JQuery<HTMLElement>;
	private confirmEmailinput : JQuery<HTMLElement>;
	private countryInput : JQuery<HTMLElement>;
	private errorDisplay : JQuery<HTMLElement>;

	private backend : Backend;
	private log : ResultLog;

	constructor(backend : Backend, log : ResultLog, complete : () => void)
	{
		super();

		this.backend = backend;
		this.log = log;
		
		this.form = $(`
		<div id="completion-window" class="flex-container center-content">
			<div style="width: 80%; text-align: center;">
				<h1>Results Submission</h1>
				<hr />
				<p>
					Press the submit button below to submit your information.
				</p>
				<div>
					<p>
						To receive a $20 Amazon gift card for your participation, fill out the form below.
					</p>
					<div class="center-content">
						<table class="w3-table" style="width: auto;">
							<tr>
								<td>Name: </td>
								<td><input id="name" type="text" name="name"/></td>
							</tr>
							<tr>
								<td>Email Address: </td>
								<td><input id="email" type="text" name="email"/></td>
							</tr>
							<tr>
								<td>Confirm Email: </td>
								<td><input id="email-confirm" type="text" name="email-confirm"/></td>
							</tr>
							<tr>
								<td>Country: </td>
								<td><input id="country" type="text" name="country"/></td>
							</tr>
						</table>
					</div>
				</div>
				<hr />
				<div id="validation-errors" style="color: red;"></div>
				<div>
					<p>
						Remember that due to the anonymous nature of the data, your results cannot be withdrawn once submitted.
					</p>
					
					<div id="captcha" class="center-content g-recaptcha" data-sitekey="6LcE_IgaAAAAAFPWhYRVD2xMb104mWtw9dmo_PYq"></div>

					<div class="center-content">
						<div style="width: 15%;">
							<button id="submit-session" class="w3-button w3-green submit">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>`
		);

		this.nameInput = this.form.find("#name");
		this.emailInput = this.form.find("#email");
		this.confirmEmailinput = this.form.find("#email-confirm");
		this.countryInput = this.form.find("#country");

		this.errorDisplay = this.form.find("#validation-errors");

		let submitButton = this.form.find("#submit-session");

		submitButton.click(async () =>
		{
			submitButton.prop("enabled", false);

			let errorMessage = "";
			let input = this.GetCompensationLog();
			let captcha = this.GetCaptcha();

			if (input.Name == "")
			{
				errorMessage = "Missing value: Name";
			}
			else if (input.Email == "")
			{
				errorMessage = "Missing value: Email"
			}
			else if (input.Email != this.confirmEmailinput.val()?.toString().trim())
			{
				errorMessage = "Email and confirm email do not match";
			}
			else if (input.Country == "")
			{
				errorMessage = "Missing value: Country"
			}
			else if (captcha.trim().length == 0)
			{
				errorMessage = "Complete the captcha"
			}

			log.Compensation = this.GetCompensationLog();

			try
			{
				await backend.SubmitSession(log, captcha);
			}
			catch (err)
			{
				if (err.status == 400)
				{
					errorMessage = "Error: Invalid captcha response";
				}
				else
				{
					errorMessage = "Error submitting session (Error code "+err.status+")";
				}
			}
			
			if (errorMessage != "")
			{
				submitButton.prop("enabled", true);
			}
			else
			{
				complete();
			}

			this.errorDisplay.html(errorMessage);
		});
	}

	public GetCompensationLog() : CompensationLog
	{
		return {
			Name: "" + this.nameInput.val()?.toString().trim(),
			Email: "" + this.emailInput.val()?.toString().trim(),
			Country: "" + this.countryInput.val()?.toString().trim()
		};
	}

	public GetCaptcha() : string
	{
		return grecaptcha.getResponse();
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().append(this.form);

		try
		{
			grecaptcha.render("captcha");
		}
		catch (err)
		{
			//Already rendered; all good
		}
	}
}