import { ResultLog } from "../../metrics/ResultLog";
import { Task } from "../../taskBase";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { StrategySurveyForm } from "./StrategySurveyForm";
import { Timer } from "../../metrics";

export class StrategySurvey extends Task
{
	private form : StrategySurveyForm;

	constructor()
	{
		let form = new StrategySurveyForm();
		super(form, new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(true);
		this.SetResultsTracked(true);

		this.form = form;
	}

	public Submit(): void
	{
		this.Controller.Submit([]);
	}
	
	public LogResults(log: ResultLog): void
	{
		let surveyResults = this.form.GetStrategies();

		for (let i = 0; i < log.Tests.length; i++)
		{
			let test = log.Tests[i];
			let strategy = surveyResults[test.Type];

			test.TechniquesUsed = strategy;
		}
	}
}