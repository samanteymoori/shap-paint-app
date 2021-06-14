import { Point } from "@/models/Point";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Shape } from "../../models/Shape";
import { ShapeType } from "../../models/ShapeType";
import { createShape } from "./../../helpers/ShapeHelper";
@Module({ namespaced: true })
class Canvas extends VuexModule {
  public currentShape?: Shape = {};
  public selectedShape: any = { Shape: { id: null, name: null } };
  public incremental_identity: number = 0;
  public shapes: Array<Object> = [];
  public redrawFlag: number = 0;
  public moveFlag: boolean = false;

  @Mutation
  public init_shape(shapeType: ShapeType): void {
    this.incremental_identity++;
    let point_count = null;
    switch (+shapeType) {
      case ShapeType.Line:
      case ShapeType.Circle:
      case ShapeType.Rectangle:
      case ShapeType.Square:
      case ShapeType.Elipsis:
        point_count = 2;
        break;
      case ShapeType.Triangle:
        point_count = 3;
        break;
      default:
        point_count = 2;
        break;
    }
    this.currentShape = {
      id: this.incremental_identity,
      name: `${ShapeType[shapeType]}_${this.incremental_identity}`,
      points: [],
      type: shapeType,
      point_count: point_count,
      fillColor: `transparent`
    };
  }
  @Mutation
  public set_point(point: Point): void {
    if (this.currentShape && this.currentShape.points) {
      this.currentShape.points.push(point);
    }
  }
  @Mutation
  public set_move_status(status: boolean): void {
    this.moveFlag = status;
  }
  @Mutation
  public redraw(): void {
    this.redrawFlag = Date.now();
  }
  @Mutation
  public clear_canvas(): void {
    this.currentShape = {};
    this.shapes = [];
  }
  @Mutation
  public select_shape(shape: any): void {
    this.selectedShape = shape;
  }
  @Mutation
  public add_shape(): void {
    const createdShape: any = createShape(this.currentShape);
    if (createdShape) this.shapes.push(createdShape);
    this.currentShape = {};
  }

  @Action
  public clearCanvas(): void {
    this.context.commit("clear_canvas");
    this.context.commit("redraw");
  }
  @Action
  public setNewShape(shapeType: ShapeType): void {
    this.context.commit("init_shape", shapeType);
  }
  @Action
  public redrawShapes(): void {
    this.context.commit("redraw");
  }
  @Action
  public selectShape(shape: any): void {
    this.context.commit("select_shape", shape);
  }
  @Action
  public setMoveStatus(status: Boolean): void {
    this.context.commit("set_move_status", status);
  }
  @Action
  public addShape(): void {
    this.context.commit("add_shape");
    this.context.commit("redraw");
  }
  @Action
  public setPoint(point: Point): void {
    this.context.commit("set_point", point);
    this.context.commit("redraw");
  }
}
export default Canvas;
