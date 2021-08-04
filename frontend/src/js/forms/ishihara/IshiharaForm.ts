import { TaskDisplay, UserInterface } from "../../io";

export class IshiharaForm extends TaskDisplay
{
	element : JQuery<HTMLElement>;
	inputs : JQuery<HTMLElement>;
	
	constructor()
	{
		super();
		this.element = $(
		`<div>
			<div style="text-align: center;">
				<p>Input the numbers you see in each circle in the corresponding textbox, then click submit</p>
			</div>
			<div class="center-content" style="flex-direction: column;">
				<div class="center-content" style="display: flex; width: 800px; flex-wrap: wrap">
					<div>
						<img style="width: 300px; height: 300px;" src="images/ishihara1.png" alt="Failed to load image" />
						<p style="text-align: center;"><input type="text" /></p>
					</div>

					<div style="margin-right: 50px;"></div>

					<div>
						<img style="width: 300px; height: 300px;" src="images/ishihara2.png" alt="Failed to load image" />
						<p style="text-align: center;"><input type="text" /></p>
					</div>
					
					<div>
						<img style="width: 300px; height: 300px;" src="images/ishihara3.png" alt="Failed to load image" />
						<p style="text-align: center;"><input type="text" /></p>
					</div>

					<div style="margin-right: 50px;"></div>

					<div>
						<img style="width: 300px; height: 300px;" src="images/ishihara4.png" alt="Failed to load image" />
						<p style="text-align: center;"><input type="text" /></p>
					</div>
				</div>
				<p class="ishiharaError" style="color: red;"></p>
			</div>
			<p>This screening task is to check that you can properly view the colors used in this study based on your viewing conditions, monitor, and vision, among other factors.</p>
		</div>`
		);

		this.inputs = this.element.find("input[type=text]");
	}

	public SetErrorMessage(message : string)
	{
		this.element.find(".ishiharaError").html(message);
	}

	public Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().append(this.element);
	}

	public Inputs() : string[]
	{
		let inputValues : string[] = [];

		for (let i = 0; i < this.inputs.length; i++)
		{
			inputValues.push(
				(<string>$(this.inputs[i]).val())
				.trim()
			);
		}

		return inputValues;
	}
}