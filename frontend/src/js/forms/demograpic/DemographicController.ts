import { TaskController, Option } from "../../taskBase";
import { DemographicForm } from "./DemographicForm";

export class DemographicController extends TaskController
{
	private form : DemographicForm;

	constructor(form : DemographicForm)
	{
		super();
		this.form = form;
	}

	public Submit(selectedOptions: Option | Option[]): void
	{
		this.form.StoreInputData();
		let inputs = this.form.GetInputData();
		console.log(inputs);
		this.Complete();
	}
}