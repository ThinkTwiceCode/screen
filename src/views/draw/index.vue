<template>
  <div
    ref="pageEl"
    class="page-straightedge"
  >
    <canvas ref="drawingBoardEl" class="drawing-board"></canvas>

    <!-- <button
      class="eraser"
      @click="eraser = !eraser"
    >橡皮擦-{{ eraser }}</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useDraw } from '@/uses/use-draw';

import type { Ref } from 'vue';

const pageEl = ref() as Ref<HTMLElement>;
const drawingBoardEl = ref() as Ref<HTMLCanvasElement>;

const { eraser } = useDraw(drawingBoardEl, pageEl);
</script>
<script lang="ts">
export default { name: 'PageStraightedge' };
</script>

<style scoped lang="less">
.page-straightedge {
  width: 100%;
  height: calc(100vh - var(--am-header-height));
  overflow: hidden;
  position: relative;
  position: fixed;
  z-index: 1000;
  top: var(--am-header-height);
  left: 0;
  overflow: hidden;

  > *:not(.drawing-board) {
    position: absolute;
  }

  .eraser {
    top: 50px;
    left: 50px;
  }
}
</style>