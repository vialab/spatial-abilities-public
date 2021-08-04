import { ClickAndDrag } from "../ClickAndDrag";

export class GraphRotationTracker
{
	private dragInteractor : ClickAndDrag;
	private GetRotation : () => {x: number, y: number};

	private currentRotation : RotationInteraction;

	private dragInstanceId = 0;
	private interactionHistory : RotationInteraction[] = [];
	private initialRotation : {x:number, y:number};

	private previousTime : number = 0;

	constructor(
		element : JQuery<HTMLElement>,
		initialRotation : {x:number, y:number},
		GetRotation : () => {x: number, y: number}
	)
	{
		this.initialRotation = initialRotation;
		this.GetRotation = GetRotation;

		this.dragInteractor = new ClickAndDrag(element);
		this.currentRotation = new RotationInteraction(this.dragInstanceId);

		this.dragInteractor.MouseDown = (evt : JQuery.MouseDownEvent) =>
		{
			this.previousTime = new Date().getTime();
		}

		this.dragInteractor.MouseDragged = (evt : JQuery.MouseMoveEvent) =>
		{
			let currentRotation = GetRotation();

			let currentTime = new Date().getTime();
			let timeDifference = currentTime - this.previousTime;
			this.previousTime = currentTime;
			
			let instance = new RotationInstance(timeDifference, currentRotation);
			this.currentRotation.Rotations.push(instance);			
		};

		this.dragInteractor.MouseUp = (evt: JQuery.MouseUpEvent) =>
		{
			this.LogCurrentInteraction();
			this.InitNextInteraction();
		}
	}

	public GetInitialRotation()
	{
		return this.initialRotation;
	}

	public GetInteractionHistory() : RotationInteraction[]
	{
		return this.interactionHistory;
	}

	protected LogCurrentInteraction()
	{
		this.interactionHistory.push(this.currentRotation);
	}

	protected InitNextInteraction()
	{
		this.dragInstanceId++;
		this.currentRotation = new RotationInteraction(this.dragInstanceId);
	}

	public Dispose()
	{
		this.dragInteractor.Dispose();
	}
}

export class RotationInteraction
{
	public Id : number;
	public Rotations : RotationInstance [] = [];

	constructor(id : number)
	{
		this.Id = id;
	}
}

export class RotationInstance
{
	public readonly DeltaTime : number;
	public readonly Current : {x:number, y:number};

	constructor(deltaTime : number, currentRotation : {x:number, y:number})
	{
		this.DeltaTime = deltaTime;
		this.Current = currentRotation;
	}
}