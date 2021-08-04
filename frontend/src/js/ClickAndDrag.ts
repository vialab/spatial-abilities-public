
//Class to help track mouse drags even when the mouse leaves the clicked element
export class ClickAndDrag
{
	private element : JQuery<HTMLElement>;

	public MouseDown : (evt : JQuery.MouseDownEvent) => void = (evt) => {};
	public MouseUp : (evt : JQuery.MouseUpEvent) => void = (evt) => {};
	public MouseDragged : (evt : JQuery.MouseMoveEvent) => void = (evt) => {};

	protected isDragging : boolean = false;

	private mouseDown : (evt: JQuery.MouseDownEvent) => void;
	private mouseUp : (evt: JQuery.MouseUpEvent) => void;
	private mouseMove : (evt: JQuery.MouseMoveEvent) => void;

	constructor(element : JQuery<HTMLElement>)
	{
		this.element = element;

		this.mouseDown = (evt : JQuery.MouseDownEvent) =>
		{
			this.isDragging = true;
			this.MouseDown(evt);
		};

		this.mouseUp = (evt: JQuery.MouseUpEvent) =>
		{
			if (this.isDragging)
			{
				this.MouseUp(evt);
			}

			this.isDragging = false;
		};

		this.mouseMove = (evt: JQuery.MouseMoveEvent) =>
		{
			if (this.isDragging)
			{
				this.MouseDragged(evt);
			}
		};

		this.element.on("mousedown", this.mouseDown);
		$(window).on("mouseup", this.mouseUp);
		$(window).on("mousemove", this.mouseMove);
	}

	public Dispose()
	{
		this.element.off("mousedown", this.mouseDown);
		$(window).off("mouseup", this.mouseUp);
		$(window).off("mousemove", this.mouseMove);
	}
}