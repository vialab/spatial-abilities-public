import { TaskController, Option } from "../../taskBase";
import { IshiharaForm } from "./IshiharaForm";

export class IshiharaController extends TaskController
{
	public IsCorrect : boolean = false;

	form : IshiharaForm;
	correctAnswers : number[];

	constructor(form : IshiharaForm, answers : number[])
	{
		super();

		this.form = form;
		this.correctAnswers = answers;
	}

	public Submit(selectedOptions: Option | Option[]): void
	{
		let answersGiven = this.form.Inputs();
		let correct : boolean = true;

		for (let i = 0; i < answersGiven.length && i < this.correctAnswers.length && correct; i++)
		{
			let givenAnswer = answersGiven[i];
			let correctAnswer = this.correctAnswers[i];

			if (!givenAnswer)
			{
				this.form.SetErrorMessage("Fill out all of the boxes.");
				return;
			}

			correct = parseInt(givenAnswer) == correctAnswer;
		}

		this.IsCorrect = correct;
		this.Complete();
	}
}