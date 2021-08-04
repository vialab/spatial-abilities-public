import { UserInterface, TaskDisplay } from "../../io";
import { TimedTestNotification } from "../../ui/components/TimedTestNotification";

export class PieChartTutorialDisplay extends TaskDisplay
{
	constructor()
	{
		super();
	}

	public Display(ui : UserInterface)
	{
		ui.ViewModeContent();
		let page = $(`<div style="text-align: center;">
			<hr />

			<p>You will be shown two pie charts.</p>
			<p>The two pie charts will use the same color scheme.</p>
			<p>A given color represents the same information in both charts (e.g., amount of time spent watching TV in a day).</p>
			<p>A slice is unchanged if it is the same size in both charts.The order of the slices does not matter for this task.</p>
			<p>Choose whether the two pie charts represent the same data.</p>
			<hr />
		</div>`);

		page.append(new TimedTestNotification().Element());

		ui.ContentContainer().append(page);
		ui.SubmitButton().html("Begin");
	}
}