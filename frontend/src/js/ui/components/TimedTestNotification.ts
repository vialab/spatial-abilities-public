import { UiElement } from "../UiElement";

export class TimedTestNotification implements UiElement
{
	Element(): JQuery<HTMLElement>
	{
		return $(
			`<div style="text-align: center">
				<p>This test has a time limit. Your remaining time is indicated at the top of the screen as follows. The practice test has no time limit.</p>
				<img src="images/timerinst.png" alt="Failed to load image" />
			</div>`
		);
	}
}