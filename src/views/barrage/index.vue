<template>
  <div class="page-container page-barrage">
    <div class="barrage-wrap">
      <TextBarrage
        ref="textBarrage"
        :text="text"
        :size="textSize"
        :speed="scrollSpeed"
        @dblclick="toggle()"
      />
    </div>

    <div class="config-item">
      <h3 class="title">文本大小</h3>
      <div class="slider-wrap">
        <ElSlider
          v-model="textSize"
          :min="12"
          :max="100"
        />

        <span class="value-text">{{ `${textSize}px` }}</span>
      </div>
    </div>

    <div class="config-item">
      <h3 class="title">滚动速度</h3>
      <div class="slider-wrap">
        <ElSlider
          v-model="scrollSpeed"
          :min="1"
          :max="100"
        />

        <span class="value-text">{{ `${scrollSpeed}px/s` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextBarrage from '@/components/text-barrage.vue';

import { ElSlider } from 'element-plus';

import {
  ref,
} from 'vue';
import { t } from '@/i18n/index';

import { useFullscreen } from '@vueuse/core';

const text = ref(t('app.subtitleDetails.original'));

const textBarrage = ref();
const { toggle } = useFullscreen(textBarrage);

const textSize = ref(30);
const scrollSpeed = ref(30);
</script>
<script lang="ts">
export default { name: 'PageBarrage' };
</script>

<style scoped lang="less">
.barrage-wrap {
  border: 1px solid var(--am-primary-color);
  border-radius: var(--am-border-corner-m);
}

.config-item {
  > .title {
    font-size: 16px;
    color: #333;
  }

  > .slider-wrap {
    display: flex;
    align-items: center;

    &:first-child {
      flex: 1;
    }

    .value-text {
      width: 100px;
      text-align: right;
    }
  }
}
</style>