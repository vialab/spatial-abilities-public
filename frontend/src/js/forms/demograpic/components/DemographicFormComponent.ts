import { FormElement } from "../../../ui/FormElement";

export abstract class DemographicFormComponent implements FormElement
{
	protected element : JQuery<HTMLElement>;
	protected isRequired : boolean = false;
	protected isRequiredErrorShowing : boolean = false;
	protected requiredFieldErrorNotification : JQuery<HTMLElement>;

	constructor(htmlTemplate : string)
	{
		this.element = $(htmlTemplate);
		this.requiredFieldErrorNotification = $(
			`<div style="color: red">* Required field</div>`
		);
	}

	public abstract Value() : any;

	public  IsRequired() : boolean
	{
		return this.isRequired;
	}

	public SetRequired(required : boolean) : void
	{
		this.isRequired = required;
	}

	public ShowRequiredFieldError()
	{
		if (!this.isRequiredErrorShowing)
		{
			this.element.prepend(this.requiredFieldErrorNotification);
			this.isRequiredErrorShowing = true;
		}
	}

	public HideRequiredFieldError()
	{
		if (this.isRequiredErrorShowing)
		{
			this.requiredFieldErrorNotification.remove();
			this.isRequiredErrorShowing = false;	
		}
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}
}