import { ThreeJsComponent } from "./ThreeJsComponent";
import { Object3D, AxesHelper, Group, Vector3, Color, ArrowHelper} from "three";
import { group } from "d3";

export class AxisLabel implements ThreeJsComponent
{
	static PADDING : number = 15;
	static ARROW_LENGTH = 25;
	allElements : Group;

	constructor(axisLength : number)
	{
		this.allElements = new Group();

		let helper = new AxesHelper(axisLength + AxisLabel.PADDING);
		helper.position.set(-axisLength/2, 0, -axisLength/2);
		this.allElements.add(helper);

		let xDir = new Vector3(1, 0, 0);
		let xPosition = new Vector3(axisLength/2 + AxisLabel.PADDING, 0, -axisLength/2);
		let xColor = 0xff0000;
		var xHelper = new ArrowHelper( xDir, xPosition, AxisLabel.ARROW_LENGTH, xColor, AxisLabel.ARROW_LENGTH, AxisLabel.ARROW_LENGTH);
		this.allElements.add(xHelper);

		let yDir = new Vector3(0, 1, 0);
		let yPosition = new Vector3(-axisLength/2, axisLength + AxisLabel.PADDING, -axisLength/2);
		let yColor = 0x00ff00;
		var yHelper = new ArrowHelper( yDir, yPosition, AxisLabel.ARROW_LENGTH, yColor, AxisLabel.ARROW_LENGTH, AxisLabel.ARROW_LENGTH);
		this.allElements.add(yHelper);

		let zDir = new Vector3(0, 0, 1);
		let zPosition = new Vector3(-axisLength/2, 0, axisLength/2 + AxisLabel.PADDING);
		let zColor = 0x0000ff;
		var zHelper = new ArrowHelper( zDir, zPosition, AxisLabel.ARROW_LENGTH, zColor, AxisLabel.ARROW_LENGTH, AxisLabel.ARROW_LENGTH);
		this.allElements.add(zHelper);
	}

	public Dispose()
	{
	}

	Component(): Object3D
	{
		return this.allElements;
	}
}