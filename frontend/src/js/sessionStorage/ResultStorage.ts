import { ResultLog } from "../metrics/ResultLog";

export abstract class ResultStorage
{
	abstract Load() : Promise<ResultLog>;
	abstract Save(list : ResultLog) : void;
	abstract Clear() : void;
}