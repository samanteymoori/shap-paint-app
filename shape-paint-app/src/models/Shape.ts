import { Point } from "./Point"
import { ShapeType } from  "./ShapeType"
 interface Shape {
    points?: Array<Point> ,
    point_count?:number,
    name?: String,
    id?:number,
    type?: ShapeType,
    fillColor?: String,
    LowerBoundX?: number,
    UpperBoundX?: number,
    LowerBoundY?: number,
    UpperBoundY?: number,
 }

export { Shape }