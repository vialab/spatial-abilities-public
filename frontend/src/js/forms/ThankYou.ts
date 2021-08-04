import { WebGLShadowMap } from "three";
import { TaskDisplay, UserInterface } from "../io";
import { ResultLog } from "../metrics/ResultLog";
import { Task } from "../taskBase";
import { EmptyTaskcontroller } from "../taskBase/EmptyTaskController";

export class ThankYou extends Task
{
	constructor()
	{
		super(new ThankYouDisplay(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(false);
		this.OverrideIntermediateScreen = true;
	}

	public Submit(): void
	{
	}

	public LogResults(log: ResultLog): void
	{
	}
}

class ThankYouDisplay extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
		let template = $(
			`<div style="width: 80%;">
				<p>
					Thank you for participating.
				</p>
				<p>
					Research conducted under the supervision of Dr. Christopher Collins at Ontario Tech University (Christopher.Collins@ontariotechu.ca) as approved by the Research Ethics Board (researchethics@uoit.ca) 905-721-8668 x 3693, [File 15987]
				</p>
			</div>`
		);

		screen.ContentContainer().append(template);
		screen.ViewModeContent();
	}
}