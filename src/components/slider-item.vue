<template>
  <div class="slider-item">
    <div class="top">
      <span class="title">{{ title }}</span>
      <BubbleTip v-if="tooltip" :content="tooltip" :size="16" />
    </div>

    <div class="bottom">
      <span class="min">{{ min }}</span>
      <ElSlider :min="min" :max="max" :step="step" class="slider" v-bind="$attrs" />
      <span class="max">{{ max }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import BubbleTip from './bubble-tip.vue';

import { withDefaults, defineProps } from 'vue';
import { ElSlider } from 'element-plus';

type PropsType = {
  title: string,
  tooltip?: string,
  min?: number,
  max?: number,
  step?: number,
}
withDefaults(defineProps<PropsType>(), {
  min: 1,
  max: 100,
  step: 1,
});
</script>
<script lang="ts">
export default { name: 'SliderItem' };
</script>

<style scoped lang="less">
.slider-item {
  > .top {
    display: flex;
    align-items: center;

    > .title {
      font-size: var(--am-font-size-l);
      margin-right: var(--am-margin-s);
    }
  }

  > .bottom {
    display: flex;
    align-items: center;

    > .min, .max {
      color: var(--am-text-color-light);
      font-size: var(--am-font-size-s);
      width: 50px;
    }

    > .min {
      text-align: left;
    }

    > .max {
      text-align: right;
    }

    > .slider {
      flex: 1;
    }
  }
}
</style>