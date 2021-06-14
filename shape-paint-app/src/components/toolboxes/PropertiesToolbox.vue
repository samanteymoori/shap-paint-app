<template>
  <div
    class="
      border
      p-2
      m-4
      capitalize
      rounded-md
      text-center
      cursor-pointer
      border
      bg-gray-200
      text-secondary-100 text-base
    "
  >
    <table v-if="selectedShape && selectedShape.Shape" class="w-full">
      <tr>
        <td><label class="">Shape</label></td>
        <td>
          <select
            v-model="dropdownShape"
            @change="shapeChanged()"
            class="w-full p-2 m-1 mr-2 rounded-md"
          >
            <option v-for="shape in shapes" :key="shape.id" :value="shape">
              {{ shape.Shape.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <label class="">Name</label>
        </td>
        <td>
          <input
            v-model="selectedShape.Shape.name"
            class="w-full p-2 m-1 mr-2 rounded-md"
            placeholder="Shape name"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td>
          <label class="">Color</label>
        </td>
        <td>
          <input
            v-model="selectedShape.Shape.fillColor"
            placeholder="Fill color"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr>
        <td>
          <label class="">X1</label>
        </td>
        <td>
          <input
            v-model.number="selectedShape.X1"
            placeholder="X1"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr>
        <td>
          <label class="">Y1</label>
        </td>
        <td>
          <input
            v-model.number="selectedShape.Y1"
            placeholder="Y1"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.X2 != null">
        <td>
          <label class="">X2</label>
        </td>
        <td>
          <input
            v-model.number="selectedShape.X2"
            placeholder="X2"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Y2 != null">
        <td>
          <label class="">Y2</label>
        </td>
        <td>
          <input
            v-model.number="selectedShape.Y2"
            placeholder="Y2"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.X3 != null">
        <td>
          <label class="">X3</label>
        </td>
        <td>
          <input
            v-model.number="selectedShape.X3"
            placeholder="X3"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Y3 != null">
        <td>
          <label class="">Y3</label>
        </td>
        <td>
          <input
            v-model.number="selectedShape.Y3"
            placeholder="Y3"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Radius != null">
        <td><label class="">Radius</label></td>
        <td>
          <input
            v-model.number="selectedShape.Radius"
            placeholder="Radius"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Width != null">
        <td><label class="">Width</label></td>
        <td>
          <input
            v-model.number="selectedShape.Width"
            placeholder="Width"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Height != null">
        <td><label class="">Height</label></td>
        <td>
          <input
            v-model.number="selectedShape.Height"
            placeholder="Height"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Length != null">
        <td><label class="">Length</label></td>
        <td>
          <input
            v-model.number="selectedShape.Length"
            placeholder="Length"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.RadiusX != null">
        <td><label class="">RadiusX</label></td>
        <td>
          <input
            v-model.number="selectedShape.RadiusX"
            placeholder="RadiusX"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.RadiusY != null">
        <td><label class="">RadiusY</label></td>
        <td>
          <input
            v-model.number="selectedShape.RadiusY"
            placeholder="RadiusY"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.Rotation != null">
        <td><label class="">Rotation</label></td>
        <td>
          <input
            v-model.number="selectedShape.Rotation"
            placeholder="Rotation"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.StartAngle != null">
        <td><label class="">Start angle</label></td>
        <td>
          <input
            v-model.number="selectedShape.StartAngle"
            placeholder="Start Angle"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
      <tr v-if="selectedShape.EndAngle != null">
        <td><label class="">End angle</label></td>
        <td>
          <input
            v-model.number="selectedShape.EndAngle"
            placeholder="End Angle"
            type="text"
            class="w-full p-2 m-1 mr-2 rounded-md"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";
const Canvas = namespace("Canvas");
@Component
export default class PropertiesToolbox extends Vue {
  public dropdownShape: any = { Shape: { id: null, name: null } };
  @Canvas.State
  public shapes!: Array<any>;

  @Canvas.State
  public selectedShape!: any;

  @Canvas.Action
  public redrawShapes!: () => void;

  @Canvas.Action
  public selectShape!: (shape: any) => void;

  public shapeChanged(): void {
    this.selectShape(this.dropdownShape);
  }

  @Watch("shapes")
  shapesChanged() {
    if (this.shapes.length == 0) {
      this.selectShape({ Shape: { id: null, name: null } });
    } else {
      this.selectShape(this.shapes[this.shapes.length - 1]);
    }
  }
  @Watch("selectedShape", { immediate: true, deep: true })
  selectedShapeChanged() {
    this.dropdownShape = this.selectedShape;

    this.redrawShapes();
  }
}
</script>
<style scoped>
td {
  padding: 10px;
}
</style>
