import { Task, TaskController, Option } from "../../taskBase";
import { ExclusionForm } from "./ExclusionForm";
import { DemographicTask } from "../demograpic";
import { Backend } from "../../Backend";
import { IshiharaTask } from "../ishihara";
import { ResultLog } from "../../metrics/ResultLog";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { StrategySurveyForm } from "../strategySurvey/StrategySurveyForm";

export class DemographicExclusion extends Task
{
	//Serialized exclusion value
	isExcluded : boolean | null;

	backend : Backend;	
	survey : DemographicTask;
	ishihara : IshiharaTask;

	constructor(backend : Backend, demographicSurvey : DemographicTask, ishihara : IshiharaTask)
	{
		super(new ExclusionForm(), new EmptyTaskcontroller());
		this.backend = backend;
		this.survey = demographicSurvey;
		this.ishihara = ishihara;

		this.SetCofidenceTracked(false);

		this.isExcluded = null;
	}

	public SetDemographicForm(demographic : DemographicTask)
	{
		this.survey = demographic;
	}

	public SetIshiharaForm(ishihara : IshiharaTask)
	{
		this.ishihara = ishihara;
	}

	public Submit()
	{
		this.Controller.Submit([]);
	}

	public async Initialize() : Promise<void>
	{
		let surveyData = this.survey.GetInputData();
		let isIshiharaCorrect = this.ishihara.IsCorrect();

		let isPreviouslyExcluded = this.isExcluded === true;
		let isFieldOfStudyAllowed = <number>surveyData.FieldOfStudy > 0 &&
			await this.backend.IsFieldOfStudyAllowed(<number>surveyData.FieldOfStudy);

		let isExcluded = this.isExcluded =
			isPreviouslyExcluded ||
			!surveyData.IsBachelorsAchieved
			|| !isIshiharaCorrect
			|| !isFieldOfStudyAllowed;

		(<ExclusionForm>this.Display).IsExcluded = isExcluded;

		if (!isExcluded)
		{
			this.Controller.Complete();
		}

		return;
	}

	public LogResults(log : ResultLog) : void
	{
	}

	public Serialize() : SerializedTask
	{
		let s = super.Serialize();
		s.Metadata = {
			isExcluded: this.isExcluded
		};
		return s;
	}

	public SetValues(serialization : SerializedTask)
	{
		super.SetValues(serialization);
		this.isExcluded = serialization.Metadata.isExcluded;
	}
}