<template>
  <div
    ref="pageEl"
    class="page-straightedge"
  >
    <canvas ref="drawingBoardEl" class="drawing-board"></canvas>

    <div class="operation-bar">
      <div class="item" @click="clear()">
        <img class="icon" :src="IconClear" />
      </div>

      <div class="item" @click="saveToImage()">
        <img class="icon" :src="IconSave" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClear from '@/assets/icon-svg/clear.svg';
import IconSave from '@/assets/icon-svg/save.svg';

import { ref } from 'vue';

import { useDraw } from '@/uses/use-draw';

import type { Ref } from 'vue';

const pageEl = ref() as Ref<HTMLElement>;
const drawingBoardEl = ref() as Ref<HTMLCanvasElement>;

const { clear, saveToImage } = useDraw(drawingBoardEl);
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

  > *:not(.drawing-board) {
    position: absolute;
  }

  .drawing-board {
    // background: #fff;
    width: 100%;
    height: 100%;
  }

  .operation-bar {
    display: flex;
    align-items: center;
    top: 20px;
    right: 20px;

    > * {
      & + * {
        margin-left: var(--am-margin-m);
      }
    }

    > .item {
      width: 30px;
      height: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      > .icon {
        width: 24px;
        object-fit: contain;
      }
    }
  }
}
</style>