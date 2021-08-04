class RotatingPointer
{
	constructor(values)
	{
		this.index = 0;
		this.values = values;
	}

	Next()
	{
		let value = this.values[this.index++];
		
		if (this.index >= this.values.length)
			this.index = 0;
		
		return value;
	}
}

module.exports = {
	RotatingPointer
};