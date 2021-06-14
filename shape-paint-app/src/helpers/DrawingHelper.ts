import { Circle } from "@/models/Circle";
import { Elipsis } from "@/models/Elipsis";
import { Rectangle } from "@/models/Rectangle";
import { Square } from "@/models/Square";
import { Triangle } from "@/models/Triangle";
import { Line } from "./../models/Line";
import { Shape } from "./../models/Shape";
import { ShapeType } from "./../models/ShapeType";
import { recalculateBounds } from "./../helpers/ShapeHelper";
export function drawShapes(
  shapes: Array<any>,
  drawingContext: any,
  selectedShape: any
): void {
  clearCanvas(drawingContext);

  shapes.forEach(shape => {
    var ctx = drawingContext.context;
    var shapeProp: Shape = shape.Shape as Shape;
    recalculateBounds(shape);
    ctx.beginPath();
    if (shapeProp.type == ShapeType.Line) {
      const line: Line = shape as Line;
      drawLine(line, ctx);
    } else if (shapeProp.type == ShapeType.Triangle) {
      const triangle: Triangle = shape as Triangle;
      drawTriangle(triangle, ctx);
    } else if (shapeProp.type == ShapeType.Circle) {
      const circle: Circle = shape as Circle;
      drawCircle(circle, ctx);
    } else if (shapeProp.type == ShapeType.Rectangle) {
      const rectangle: Rectangle = shape as Rectangle;
      drawRectangle(rectangle, ctx);
    } else if (shapeProp.type == ShapeType.Square) {
      const square: Square = shape as Square;
      drawSquare(square, ctx);
    } else if (shapeProp.type == ShapeType.Elipsis) {
      const elipsis: Elipsis = shape as Elipsis;
      drawElipsis(elipsis, ctx);
    }
    ctx.fillStyle = shapeProp.fillColor;
    ctx.fill();
    if (selectedShape != null && selectedShape.Shape.id == shapeProp.id) {
      ctx.setLineDash([5, 3]);
      ctx.setLineDash([5, 3]);
      ctx.strokeStyle = "blue";
    } else {
      ctx.strokeStyle = "black";
      ctx.setLineDash([0]);
    }

    ctx.stroke();
    //TEST Bounderies of each shape to select on canvas
    // ctx.beginPath();
    // ctx.strokeStyle = "red";
    // if (
    //   shapeProp.LowerBoundX != null &&
    //   shapeProp.UpperBoundX != null &&
    //   shapeProp.UpperBoundY != null &&
    //   shapeProp.LowerBoundY != null
    // )
    //   drawRectangle(
    //     {
    //       Shape: {},
    //       X1: shapeProp.LowerBoundX,
    //       Y1: shapeProp.LowerBoundY,
    //       Width: shapeProp.UpperBoundX - shapeProp.LowerBoundX,
    //       Height: shapeProp.UpperBoundY - shapeProp.LowerBoundY
    //     },
    //     ctx
    //   );
    // ctx.font = "15px Arial";
    // ctx.fillText(
    //   `${shapeProp.LowerBoundX},${shapeProp.LowerBoundY},${shapeProp.UpperBoundX},${shapeProp.UpperBoundY}`,
    //   shapeProp.LowerBoundX,
    //   shapeProp.LowerBoundY
    // );
    // ctx.stroke();
  });
}
export function drawLine(line: Line, ctx: any): void {
  ctx.moveTo(line.X1, line.Y1);
  ctx.lineTo(line.X2, line.Y2);
}
export function drawTriangle(triangle: Triangle, ctx: any): void {
  ctx.moveTo(triangle.X1, triangle.Y1);
  ctx.lineTo(triangle.X2, triangle.Y2);
  ctx.lineTo(triangle.X3, triangle.Y3);
  ctx.closePath();
}

export function drawCircle(circle: Circle, ctx: any): void {
  ctx.arc(
    circle.X1,
    circle.Y1,
    circle.Radius,
    circle.StartAngle * Math.PI,
    circle.EndAngle * Math.PI
  );
}
export function drawRectangle(rectangle: Rectangle, ctx: any): void {
  ctx.rect(rectangle.X1, rectangle.Y1, rectangle.Width, rectangle.Height);
}
export function drawSquare(square: Square, ctx: any): void {
  ctx.rect(square.X1, square.Y1, square.Length, square.Length);
}
export function drawElipsis(elipsis: Elipsis, ctx: any): void {
  ctx.ellipse(
    elipsis.X1,
    elipsis.Y1,
    elipsis.RadiusX,
    elipsis.RadiusY,
    elipsis.Rotation,
    elipsis.StartAngle * Math.PI,
    elipsis.EndAngle * Math.PI
  );
}
export function clearCanvas(drawingContext: any): void {
  drawingContext.context.clearRect(
    0,
    0,
    drawingContext.canvas.width,
    drawingContext.canvas.height
  );
}
