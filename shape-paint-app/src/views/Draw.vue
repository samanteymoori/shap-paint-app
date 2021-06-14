<template>
  <div class="w-full">
    <div class="grid grid-cols-12 w-full">
      <div class="col-span-10"><DrawingCanvas></DrawingCanvas></div>
      <div class="col-span-2">
        <DrawingToolbox></DrawingToolbox>
        <PropertiesToolbox></PropertiesToolbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DrawingToolbox from "@/components/toolboxes/DrawingToolbox.vue";
import DrawingCanvas from "@/components/layouts/DrawingCanvas.vue";
import PropertiesToolbox from "@/components/toolboxes/PropertiesToolbox.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    DrawingCanvas,
    DrawingToolbox,
    PropertiesToolbox
  }
})
export default class Draw extends Vue {}
</script>
