import { Task, TaskController, Option } from "../../taskBase";
import { TaskDisplay, UserInterface } from "../../io";
import { WaveGraphContourComparison } from "./Displays/WaveGraphContourComparison";
import { ResultLog } from "../../metrics/ResultLog";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";
import { SerializedTask } from "../../taskBase/SerializedTask";
import { TimedTestNotification } from "../../ui/components/TimedTestNotification";

export class IsocontourTutorial extends Task
{
	constructor()
	{
		super (new IsoTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("Isocontour Instructions");
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public LogResults(log : ResultLog) : void
	{
	}
	
	public Submit()
	{
		this.Controller.Submit([]);
	}
}

class IsoTutorialDisplay extends TaskDisplay
{
	private graph : WaveGraphContourComparison;
	constructor()
	{
		super();
		this.graph = new WaveGraphContourComparison(400);
		this.graph.Rotate3dPlotTo(90, 0);
	}

	public Dispose()
	{
		this.graph.Dispose();
	}

	public Display(screen: UserInterface): void
	{
		let template = $(
		`<div style="width: 800px; text-align: center;">
			<div style="display: flex; justify-content: center;">
				<div class="planeContainer">
				</div>
				<div class="graphContainer">
				</div>
			</div>
			
			<hr />
			<div style="text-align: center;">
				<p>You will be provided with a 2D isocontour (topographical) plot of a 3D surface and a 3D plot (see examples above).</p>
				<p>The two plots are the same if they show the same spatial variation along each axis (each arrow).</p>
				<p>Choose whether the 2D and 3D plots match each other.</p>
				<p>You can rotate the 3D view by clicking on it and dragging your mouse.</p>
			</div>
			<hr />
			<div>
			</div>
		</div>`
		);

		this.graph.GetPlaneView().RenderOnce();
		this.graph.GetInteractableGraph().RenderContinuously();

		template.find(".planeContainer").append(this.graph.GetPlaneView().Element());
		template.find(".graphContainer").append(this.graph.GetInteractableGraph().Element());

		template.append(new TimedTestNotification().Element());

		screen.ViewModeContent();
		screen.SubmitButton().html("Begin");
		screen.ContentContainer().append(template);
	}

}