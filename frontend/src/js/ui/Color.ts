export class Color
{
	private red : number;
	private green : number;
	private blue : number;
	private alpha : number;

	constructor(red : number, blue : number, green : number, alpha : number)
	{
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}

	HtmlColour() : string
	{
		return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
	}
}