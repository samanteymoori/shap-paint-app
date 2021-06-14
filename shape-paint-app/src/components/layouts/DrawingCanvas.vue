<template>
  <div class="w-full">
    <canvas
      id="myCanvas"
      :width="canvasWidth"
      title="Double click on Canvas to move objects"
      :height="canvasHeight"
      :style="`width:${canvasWidth};height:${canvasHeight}`"
      :class="{
        'border-secondary-100': true,
        'cursor-crosshair': currentShape && currentShape.id,
        'all-scroll': selectedShape && moveFlag
      }"
      @click="CanvasClick"
      @keydown="KeyHandle"
      @dblclick="SelectShapeToMove"
      @mousemove="CanvasMouseMove"
    >
    </canvas>
    <div class="text-secondary-100 text-base">
      ( Double Click : Select , Move , Stop Moving ) , X:
      {{ currentPoint.x }} Y:
      {{ currentPoint.y }}
    </div>
    <div class="hidden">
      {{ moveFlag }}
      {{ selectedShape }}
      {{ redrawFlag }}
      {{ currentPoint ? currentPoint : "" }}
      {{ clickedPoint ? clickedPoint : "" }}
      {{ currentShape ? currentShape : "" }}
      {{ incremental_identity }}
      {{ shapes }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Point } from "../../models/Point";
import { Shape } from "../../models/Shape";
import { drawShapes } from "./../../helpers/DrawingHelper";
import { recalculateBounds } from "./../../helpers/ShapeHelper";

const Canvas = namespace("Canvas");

@Component
export default class DrawingCanvas extends Vue {
  public currentPoint?: Point = { x: 0, y: 0 };
  public clickedPoint?: Point = { x: 0, y: 0 };
  @Canvas.State
  public shapes!: Array<any>;
  @Canvas.State
  public redrawFlag!: number;
  @Canvas.State
  public currentShape!: Shape;
  @Canvas.State
  public incremental_identity!: number;
  @Canvas.State
  public selectedShape!: any;
  @Canvas.State
  public moveFlag!: number;

  @Canvas.Action
  public setPoint!: (point: Point) => void;
  @Canvas.Action
  public addShape!: () => void;
  @Canvas.Action
  public redrawShapes!: () => void;
  @Canvas.Action
  public setMoveStatus!: (status: Boolean) => void;

  @Canvas.Action
  public selectShape!: (shape: any) => void;

  get canvasWidth() {
    return window.innerWidth - 5;
  }
  get canvasHeight() {
    return window.innerHeight - 25;
  }
  @Watch("redrawFlag")
  onPropertyChanged() {
    drawShapes(this.shapes, this.getDrawingContext(), this.selectedShape);
  }
  @Watch("selectedShape", { immediate: true, deep: true })
  selectedShapeChanged() {
    this.redrawShapes();
  }
  public KeyHandle(args: any) {
    debugger;
  }
  getMousePos(canvas: any, evt: any) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  updated() {
    if (
      this.currentShape &&
      this.currentShape.id &&
      this.currentShape.points &&
      this.currentShape.points.length == this.currentShape.point_count
    ) {
      this.addShape();
      drawShapes(this.shapes, this.getDrawingContext(), this.selectedShape);
    }
  }

  public getDrawingContext() {
    var c: any = document.getElementById("myCanvas");
    return { canvas: c, context: c.getContext("2d") };
  }
  public CanvasClick(evt: any) {
    var rect = this.getDrawingContext().canvas.getBoundingClientRect();
    this.clickedPoint = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
    this.setPoint(this.clickedPoint);
  }
  public SelectShapeToMove(args: any) {
    if (
      this.currentPoint &&
      this.currentPoint.x != null &&
      this.currentPoint.y != null &&
      !this.moveFlag
    ) {
      const foundShapes = this.shapes.filter(shape => {
        return (
          this.currentPoint != null &&
          this.currentPoint.x >= shape.Shape.LowerBoundX &&
          this.currentPoint.x <= shape.Shape.UpperBoundX &&
          this.currentPoint.y >= shape.Shape.LowerBoundY &&
          this.currentPoint.y <= shape.Shape.UpperBoundY
        );
      });
      if (foundShapes && foundShapes.length > 0) {
        if (foundShapes[0].Shape.id == this.selectedShape.Shape.id) {
          this.setMoveStatus(!this.moveFlag);
        } else {
          this.selectShape(foundShapes[0]);
        }
      }
    } else {
      this.setMoveStatus(!this.moveFlag);
    }
  }
  public CanvasMouseMove(evt: any) {
    var rect = this.getDrawingContext().canvas.getBoundingClientRect();
    this.currentPoint = {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
    if (
      this.moveFlag &&
      this.currentPoint != null &&
      this.currentPoint.x != null &&
      this.currentPoint.y != null
    ) {
      const diffX = this.currentPoint.x - this.selectedShape.X1;
      const diffY = this.currentPoint.y - this.selectedShape.Y1;

      this.selectedShape.X1 = this.currentPoint.x;
      this.selectedShape.Y1 = this.currentPoint.y;
      if (this.selectedShape.X2) {
        this.selectedShape.X2 += diffX;
      }
      if (this.selectedShape.Y2) {
        this.selectedShape.Y2 += diffY;
      }
      if (this.selectedShape.X3) {
        this.selectedShape.X3 += diffX;
      }
      if (this.selectedShape.Y3) {
        this.selectedShape.Y3 += diffY;
      }
      recalculateBounds(this.selectedShape);
    }
  }
}
</script>
