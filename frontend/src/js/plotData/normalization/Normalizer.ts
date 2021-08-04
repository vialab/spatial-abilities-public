import { Point } from "../Point";

export interface Normalizer
{
	Normalize(points : Point[]) : Point[];
}