import { Circle } from "@/models/Circle";
import { Elipsis } from "@/models/Elipsis";
import { Point } from "@/models/Point";
import { Rectangle } from "@/models/Rectangle";
import { Square } from "@/models/Square";
import { Triangle } from "@/models/Triangle";
import { Line } from "./../models/Line";
import { Shape } from "./../models/Shape";

import { ShapeType } from "./../models/ShapeType";
export function getPointMeasures(
  point1: Point,
  point2: Point,
  point3: any = null
): any {
  const X1 = point1.x;
  const Y1 = point1.y;
  const X2 = point2.x;
  const Y2 = point2.y;
  const Width = X2 - X1;
  const Height = Y2 - Y1;
  const PositiveWidth = Width < 0 ? -1 * Width : Width;
  const PositiveHeight = Height < 0 ? -1 * Height : Height;
  const LargerLength =
    PositiveWidth > PositiveHeight ? PositiveWidth : PositiveHeight;
  return {
    X1,
    X2,
    Y1,
    Y2,
    Width,
    Height,
    PositiveWidth,
    PositiveHeight,
    LargerLength,
    X3: point3 ? point3.x : null,
    Y3: point3 ? point3.y : null
  };
}

export function createLine(shape: Shape): any {
  if (shape.points?.length == 2) {
    const measures = getPointMeasures(shape.points[0], shape.points[1]);

    const line: Line = {
      Shape: shape,
      X1: measures.X1,
      Y1: measures.Y1,
      X2: measures.X2,
      Y2: measures.Y2
    };
    calculateBoundLine(line);

    return line;
  }
  return null;
}
export function recalculateBounds(shape: any) {
  var shapeProp: Shape = shape.Shape as Shape;
  if (shapeProp.type == ShapeType.Line) {
    const line: Line = shape as Line;
    calculateBoundLine(line);
  } else if (shapeProp.type == ShapeType.Triangle) {
    const triangle: Triangle = shape as Triangle;
    calculateBoundTriangle(triangle);
  } else if (shapeProp.type == ShapeType.Circle) {
    const circle: Circle = shape as Circle;
    calculateBoundCircle(circle);
  } else if (shapeProp.type == ShapeType.Rectangle) {
    const rectangle: Rectangle = shape as Rectangle;
    calculateBoundRectangle(rectangle);
  } else if (shapeProp.type == ShapeType.Square) {
    const square: Square = shape as Square;
    calculateBoundSquare(square);
  } else if (shapeProp.type == ShapeType.Elipsis) {
    const elipsis: Elipsis = shape as Elipsis;
    calculateBoundElipsis(elipsis);
  }
}
export function calculateBoundLine(line: Line): void {
  line.Shape.LowerBoundX = Math.min(line.X1, line.X2);
  line.Shape.UpperBoundX = Math.max(line.X1, line.X2);
  line.Shape.LowerBoundY = Math.min(line.Y1, line.Y2);
  line.Shape.UpperBoundY = Math.max(line.Y1, line.Y2);
}
export function createRectangle(shape: Shape): any {
  if (shape.points?.length == 2) {
    const measures = getPointMeasures(shape.points[0], shape.points[1]);
    const rectangle: Rectangle = {
      Shape: shape,
      X1: measures.X1,
      Y1: measures.Y1,
      Width: measures.Width,
      Height: measures.Height
    };
    calculateBoundRectangle(rectangle);
    return rectangle;
  }
  return null;
}
export function calculateBoundRectangle(rectangle: Rectangle): void {
  rectangle.Shape.LowerBoundX = Math.min(
    rectangle.X1,
    rectangle.X1 + rectangle.Width
  );

  rectangle.Shape.UpperBoundX = Math.max(
    rectangle.X1,
    rectangle.X1 + rectangle.Width
  );

  rectangle.Shape.LowerBoundY = Math.min(
    rectangle.Y1,
    rectangle.Y1 + rectangle.Height
  );

  rectangle.Shape.UpperBoundY = Math.max(
    rectangle.Y1,
    rectangle.Y1 + rectangle.Height
  );
}
export function createSquare(shape: Shape): any {
  if (shape.points?.length == 2) {
    const measures = getPointMeasures(shape.points[0], shape.points[1]);
    const square: Square = {
      Shape: shape,
      X1: measures.X1,
      Y1: measures.Y1,
      Length: measures.LargerLength
    };
    calculateBoundSquare(square);
    return square;
  }
  return null;
}

export function calculateBoundSquare(square: Square): void {
  square.Shape.LowerBoundX = Math.min(square.X1, square.X1 + square.Length);

  square.Shape.UpperBoundX = Math.max(square.X1, square.X1 + square.Length);

  square.Shape.LowerBoundY = Math.min(square.Y1, square.Y1 + square.Length);

  square.Shape.UpperBoundY = Math.max(square.Y1, square.Y1 + square.Length);
}
export function createCircle(shape: Shape): any {
  if (shape.points?.length == 2) {
    const measures = getPointMeasures(shape.points[0], shape.points[1]);
    const circle: Circle = {
      Shape: shape,
      X1: measures.X1,
      Y1: measures.Y1,
      Radius: measures.PositiveWidth,
      StartAngle: 0,
      EndAngle: 2
    };
    calculateBoundCircle(circle);
    return circle;
  }
  return null;
}

export function calculateBoundCircle(circle: Circle): void {
  circle.Shape.LowerBoundX = Math.min(
    circle.X1 - circle.Radius,
    circle.X1,
    circle.X1 + circle.Radius
  );

  circle.Shape.UpperBoundX = Math.max(
    circle.X1 - circle.Radius,
    circle.X1,
    circle.X1 + circle.Radius
  );

  circle.Shape.LowerBoundY = Math.min(
    circle.Y1 - circle.Radius,
    circle.Y1,
    circle.Y1 + circle.Radius
  );

  circle.Shape.UpperBoundY = Math.max(
    circle.Y1 - circle.Radius,
    circle.Y1,
    circle.Y1 + circle.Radius
  );
}
export function createTriangle(shape: Shape): any {
  if (shape.points?.length == 3) {
    const measures = getPointMeasures(
      shape.points[0],
      shape.points[1],
      shape.points[2]
    );
    const triangle: Triangle = {
      Shape: shape,
      X1: measures.X1,
      Y1: measures.Y1,
      X2: measures.X2,
      Y2: measures.Y2,
      X3: measures.X3,
      Y3: measures.Y3
    };

    calculateBoundTriangle(triangle);

    return triangle;
  }
  return null;
}
export function calculateBoundTriangle(triangle: Triangle): void {
  triangle.Shape.LowerBoundX = Math.min(triangle.X1, triangle.X2, triangle.X3);

  triangle.Shape.UpperBoundX = Math.max(triangle.X1, triangle.X2, triangle.X3);

  triangle.Shape.LowerBoundY = Math.min(triangle.Y1, triangle.Y2, triangle.Y3);

  triangle.Shape.UpperBoundY = Math.max(triangle.Y1, triangle.Y2, triangle.Y3);
}
export function createElipsis(shape: Shape): any {
  if (shape.points?.length == 2) {
    const measures = getPointMeasures(shape.points[0], shape.points[1]);
    const elipsis: Elipsis = {
      Shape: shape,
      X1: measures.X1,
      Y1: measures.Y1,
      RadiusX: measures.PositiveWidth,
      RadiusY: measures.PositiveHeight,
      Rotation: 0,
      StartAngle: 0,
      EndAngle: 2
    };
    calculateBoundElipsis(elipsis);
    return elipsis;
  }
  return null;
}
export function calculateBoundElipsis(elipsis: Elipsis): void {
  elipsis.Shape.LowerBoundX = Math.min(
    elipsis.X1 - elipsis.RadiusX,
    elipsis.X1,
    elipsis.X1 + elipsis.RadiusX
  );

  elipsis.Shape.UpperBoundX = Math.max(
    elipsis.X1 - elipsis.RadiusX,
    elipsis.X1,
    elipsis.X1 + elipsis.RadiusX
  );

  elipsis.Shape.LowerBoundY = Math.min(
    elipsis.Y1 - elipsis.RadiusY,
    elipsis.Y1,
    elipsis.Y1 + elipsis.RadiusY
  );

  elipsis.Shape.UpperBoundY = Math.max(
    elipsis.Y1 - elipsis.RadiusY,
    elipsis.Y1,
    elipsis.Y1 + elipsis.RadiusY
  );
}
