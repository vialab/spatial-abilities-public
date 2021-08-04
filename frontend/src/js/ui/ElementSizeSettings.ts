export abstract class ElementSizeSettings
{
	public abstract CanvasSideLength() : number;
}

export class DefaultElementSizeSettings extends ElementSizeSettings
{
	public CanvasSideLength() : number
	{
		return 400;
	}
}