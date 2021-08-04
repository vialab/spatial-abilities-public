export class Point
{
	public X : number;
	public Y : number;
	public Z : number;

	constructor(x : number, y : number, z : number)
	{
		this.X = x;
		this.Y = y;
		this.Z = z;
	}

	public Length() : number
	{
		let length = Math.sqrt(this.X*this.X+this.Y*this.Y+this.Z*this.Z);
		return length;
	}

	public Normalize() : void
	{
		let length = this.Length();
		this.X = this.X / length;
		this.Y = this.Y / length;
		this.Z = this.Z / length;
	}
}