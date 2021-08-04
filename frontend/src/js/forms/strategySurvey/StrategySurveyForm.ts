import { TaskDisplay, UserInterface } from "../../io";
import { TestTypes } from "../../tests/TestTypes";

export class StrategySurveyForm extends TaskDisplay
{
	private template : JQuery<HTMLElement>;
	private rotationInput : JQuery<HTMLElement>;
	private pieChartInput : JQuery<HTMLElement>;
	private scatterPlotInput : JQuery<HTMLElement>;
	private isocontourInput : JQuery<HTMLElement>;

	constructor()
	{
		super();

		this.template = $(
			`<div class="center-content" style="flex-direction: column; max-height: 100%; width: 90%; overflow: scroll; overflow-x: auto;">
				<div style="max-height: 100%;">
					<style>
						.thisdiv
						{
							display: flex;
							flex-direction: column;
							margin-bottom: 15px;
						}
					</style>
					
					<p style="margin-top: 100px;">
						Please describe any strategies that you used to solve each type of test or task.
					</p>
					
					<hr />

					<div class="thisdiv">
						<img style="width: 200px; height: 75px; margin-right: 10px;"
							src="images/feedback/rotationpreview.png"
						/>
						<p>3D Rotation</p>
						<textarea id="rotationstrategy" style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<img style="width: 75px; height: 75px; margin-right: 10px;"
							src="images/feedback/sample-piechart.png"
						/>
						<p>Pie Chart Comparison</p>
						<textarea id="piechartstrategy" style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<img style="width: 250px; height: 100px; margin-right: 10px;"
							src="images/feedback/scatterplotpreview.png"
						/>
						<p>Scatter Plot</p>
						<textarea id="scatterplotstrategy" style="width: 500px;"></textarea>
					</div>

					<hr />

					<div class="thisdiv">
						<div style="display: flex; flex-direction: row;">
							<img style="width: 75px; height: 75px;"
								src="images/feedback/Contour_Plot.jpg"
							/>
							<img style="width: 75px; height: 75px; margin-right: 10px;"
								src="images/feedback/3D_Surface.jpg"
							/>
						</div>
						<p>Isocontour</p>
						<textarea id="isocontourstrategy" style="width: 500px;"></textarea>
					</div>

				</div>
			</div>`
		);

		this.rotationInput = this.template.find("#rotationstrategy");
		this.pieChartInput = this.template.find("#piechartstrategy");
		this.scatterPlotInput = this.template.find("#scatterplotstrategy");
		this.isocontourInput = this.template.find("#isocontourstrategy");
	}

	public Display(screen: UserInterface): void
	{
		screen.ContentContainer().append(this.template);
		screen.ViewModeContent();
	}
	
	public GetStrategies() : {[type : number]: string}
	{
		let strategies : {[type : number]: string} = {};

		strategies[TestTypes.ISOCONTOUR] = <string>(this.isocontourInput.val() || "");
		strategies[TestTypes.PIE_CHART] = <string>(this.pieChartInput.val() || "");
		strategies[TestTypes.ROTATION] = <string>(this.rotationInput.val() || "");
		strategies[TestTypes.SCATTER_PLOT] = <string>(this.scatterPlotInput.val() || "");

		return strategies;
	}
}