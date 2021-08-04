export class IdGenerator
{
	static currentId : number = 0;
	static Generate() : string
	{
		return "GeneratedId_" + IdGenerator.currentId++;
	}
}