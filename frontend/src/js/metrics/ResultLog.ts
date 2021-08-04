export class ResultLog
{
	TotalTime : number = 0;
	TaskOrderName : string = "";
	Screen : ScreenLog = new ScreenLog();
	Demographics : DemographicsLog = new DemographicsLog();
	Tests : TestLog[] = [];
	Compensation : CompensationLog = new CompensationLog();

	public LogTest(test : TestLog)
	{
		this.Tests.push(test);

		console.log("Logged test");
		console.log(test);
		console.log("Result state");
		console.log(this);
	}

	public LogConfidence(testType : number, confidence : number)
	{
		for (let i = 0; i < this.Tests.length; i++)
		{
			let test = this.Tests[i];
			
			if (test.Type == testType)
			{
				test.UserConfidence = confidence;
			}
		}
	}
}

export class ScreenLog
{
	Width : number = 0;
	Height : number = 0;
	Dpi : number = 0;
}

export class DemographicsLog
{
	Education : EducationLog[] = [];
	IsWorkplaceDrawingsUsed : boolean = false;
	WorkplaceGraphics : ImportanceLog = new ImportanceLog();
	WorkplaceDrawings : ImportanceLog = new ImportanceLog();
	VisualArt : TimeSpentLog = new TimeSpentLog();
	VideoGames : TimeSpentLog = new TimeSpentLog();
	FieldOfStudy : number = 0;
	Age : number = 0;
	Gender : string = "";
}

export class EducationLog
{
	Degree : string = "";
	Specialty : string = "";
	IsCompleted : boolean = false;
	Years : number = 0;
}

export class ImportanceLog
{
	Importance : number = 0;
	Description : string = "";
}

export class TimeSpentLog
{
	TimeSpent : number = 0;
	Description : string = "";
}

export class TestLog
{
	Type : number = 0;
	Duration : number = 0;
	TechniquesUsed : string = "";
	UserConfidence : number = 0;
	Order : number = -1;
	Metadata : any = {};
	Options : OptionLog[] = [];
	Rotations : RotationLog[] = [];
}

export class OptionLog
{
	Name : string = "";
	SelectedState : number = 0;
	CorrectState : number = 0;
}

export class RotationLog
{
	Id : number = 0;
	InitialOffset : {x:number, y:number} | null = null;
	Instances : RotationInstanceLog[] = [];
}

export class RotationInstanceLog
{
	InteractionId : number = 0;
	DeltaTime : number = 0;
	x : number = 0;
	y : number = 0;
}

export class CompensationLog
{
	Name : string = "";
	Email : string = "";
	Country : string = "";
}