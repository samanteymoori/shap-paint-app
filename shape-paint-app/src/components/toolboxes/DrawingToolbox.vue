<template>
  <div class="">
    <div class="">
      <div
        class="
          border
          p-2
          grid grid-cols-2
          m-4
          capitalize
          rounded-md
          text-center
          cursor-pointer
          absolute
          z-10
          border
          right-0
          bg-gray-200
          text-secondary-100 text-base
        "
        style="width:300px"
      >
        <button
          class="border p-1"
          v-for="(item, index) in getItems()"
          :key="index"
          @click="setNewShape(item.shapeType)"
        >
          {{ item.name }}
        </button>
        <button class="border col-span-2 p-1" @click="clearCanvas()">
          Clear
        </button>
        <button class="border col-span-2 p-1" @click="setMoveStatus(true)">
          Move
        </button>
        <button class="border col-span-2 p-1" @click="Save()">Save</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ShapeType } from "@/models/ShapeType";
const Canvas = namespace("Canvas");
@Component
export default class DrawingToolbox extends Vue {
  public getItems(): Array<any> {
    return [
      { name: ShapeType[ShapeType.Line], shapeType: ShapeType.Line },
      { name: ShapeType[ShapeType.Circle], shapeType: ShapeType.Circle },
      { name: ShapeType[ShapeType.Rectangle], shapeType: ShapeType.Rectangle },
      { name: ShapeType[ShapeType.Triangle], shapeType: ShapeType.Triangle },
      { name: ShapeType[ShapeType.Square], shapeType: ShapeType.Square },
      { name: ShapeType[ShapeType.Elipsis], shapeType: ShapeType.Elipsis }
    ];
  }
  public Save() {
    var image = this.getDrawingContext()
      .canvas.toDataURL("image/png")
      .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    window.location.href = image;
  }
  public getDrawingContext() {
    var c: any = document.getElementById("myCanvas");
    return { canvas: c, context: c.getContext("2d") };
  }
  @Canvas.Action
  public setNewShape!: (shapeType: ShapeType) => void;
  @Canvas.Action
  public clearCanvas!: () => void;
  @Canvas.Action
  public setMoveStatus!: (status: Boolean) => void;
}
</script>
