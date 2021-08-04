import { UiElement } from "./UiElement";

export interface FormElement extends UiElement
{
	Value() : any;
}