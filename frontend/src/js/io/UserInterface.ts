import {Option, Task} from "../taskBase";
import { ConfidenceWindow } from "./ConfidenceWindow";

export class UserInterface
{
	protected titleContainer : JQuery<HTMLElement>;
	protected promptContainer : JQuery<HTMLElement>;
	protected timerBar : JQuery<HTMLElement>;
	protected optionsContainer : JQuery<HTMLElement>;
	
	protected contentContainer : JQuery<HTMLElement>;

	protected comparisonContainer : JQuery<HTMLElement>;
	protected originalView : JQuery<HTMLElement>
	protected comparisonView : JQuery<HTMLElement>;

	protected completionContainer : JQuery<HTMLElement>;

	protected confidenceArea : JQuery<HTMLElement>;

	protected submitButton : JQuery<HTMLElement>;

	protected intermediateScreen : ConfidenceWindow;
	protected mobileRejectionScreen : JQuery<HTMLElement>;

	constructor()
	{
		this.titleContainer = $("#title");
		this.promptContainer = $("#prompt");
		this.timerBar = $("#test-timer");
		this.optionsContainer = $("#options");

		this.contentContainer = $("#content-single");

		this.comparisonContainer = $("#comparison-area");;
		this.originalView = $("#test-original");
		this.comparisonView = $("#test-compare");

		this.completionContainer = $("#completion-window");

		this.confidenceArea = $("#feedback");

		this.submitButton = $("#submit-test");

		this.intermediateScreen = new ConfidenceWindow();
		this.mobileRejectionScreen = $("#mobile-rejection");
	}

	SetErrorMessage(message : string) : void
	{
		$("#Errors").html(message);
	}

	ClearErrorMessage() : void
	{
		$("#Errors").html("");
	}

	SetTitle(title : string) : void
	{
		this.titleContainer.html(title);
	}

	SetPrompt(prompt : string) : void
	{
		this.promptContainer.html(prompt);
	}

	SetTimerProgress(progress : number) : void
	{
		this.timerBar.attr("aria-valuenow", progress);
		this.timerBar.css("width", progress + "%");
	}

	ShowOptions(task : Task) : void
	{
		this.optionsContainer.html("");

		// let options = task.GetOptions();

		// for (let i = 0; i < options.length; i++)
		// {
		// 	let option = options[i];
		// 	let element = options[i].Element();

		// 	element.prop("data-option-id", option.Id);
		// 	element.click(() =>
		// 	{
		// 		task.Controller.Submit(option);
		// 	});

		// 	this.optionsContainer.append(element);
		// }
	}

	ShowTestProgress(current : number, total : number) : void
	{
		$("#test-progress").html(current + " of " + total);
	}

	HideTestProgress()
	{
		$("#test-progress").html("");
	}
	
	OptionsContainer() : JQuery<HTMLElement>
	{
		return this.optionsContainer;
	}

	ContentContainer() : JQuery<HTMLElement>
	{
		return this.contentContainer;
	}

	OriginalViewContainer() : JQuery<HTMLElement>
	{
		return this.originalView;
	}

	ComparisonViewContainer() : JQuery<HTMLElement>
	{
		return this.comparisonView;
	}

	PromptContainer() : JQuery<HTMLElement>
	{
		return this.promptContainer;
	}

	SubmitButton() : JQuery<HTMLElement>
	{
		return this.submitButton;
	}

	ViewModeComparison()
	{
		this.contentContainer.hide();
		this.completionContainer.hide();
		this.mobileRejectionScreen.hide();
		this.comparisonContainer.show();
	}

	ViewModeContent()
	{
		this.comparisonContainer.hide();
		this.completionContainer.hide();
		this.mobileRejectionScreen.hide();
		this.contentContainer.show();
	}

	ViewModeTestsComplete()
	{
		this.comparisonContainer.hide();
		this.contentContainer.hide();
		this.mobileRejectionScreen.hide();
		this.completionContainer.show();
	}

	ViewModeMobileBrowserRejection()
	{
		this.comparisonContainer.hide();
		this.contentContainer.hide();
		this.completionContainer.hide();
		this.mobileRejectionScreen.show();
	}

	ClearView()
	{
		this.originalView.html("");
		this.comparisonView.html("");
		this.contentContainer.html("");
		this.promptContainer.html("");
	}

	ShowSubmitButton()
	{
		this.submitButton.show();
	}

	HideSubmitButton()
	{
		this.submitButton.hide();
	}

	GetIntermediateTestScreen()
	{
		return this.intermediateScreen;
	}
}