<template>
  <BaseCard
    :to="{ name: 'Barrage' }"
    :icon="Icon"
    :title="$t('barrage.title')"
  >
    <template #description>
      <div ref="descriptionWrapEl" class="description-wrap">
        <div ref="descriptionEl" class="description">{{ barrageStorage.text }}</div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './index.vue';

import Icon from '@/assets/icon-svg/barrage.svg';

import { ref, onMounted } from 'vue';

import { useAnimate } from '@/uses/use-animate';
import { useBarrageStorage } from '@/uses/use-barrage-storage';

import type { Ref } from 'vue';

const barrageStorage = useBarrageStorage();

const descriptionWrapEl = ref() as Ref<HTMLElement>;
const descriptionEl = ref() as Ref<HTMLElement>;

const textAnimate = useAnimate(descriptionEl);

function updateAnimate() {
  textAnimate.cancel();

  const wrapWidth = descriptionWrapEl.value.offsetWidth;
  const textWidth = descriptionEl.value.offsetWidth;
  const duration = (wrapWidth + textWidth) * 1000 / 50;
  const keyframes: Keyframe[] = [
    { left: '100%' },
    { left: `-${textWidth}px` },
  ];
  const options: KeyframeAnimationOptions = {
    duration,
    iterations: Infinity,
    easing: 'linear',
    fill: 'backwards',
  };  
  textAnimate.start(keyframes, options);
}

onMounted(updateAnimate);
</script>
<script lang="ts">
export default { name: 'CardBarrage' };
</script>

<style scoped lang="less">
.description-wrap {
  width: 100%;
  line-height: 24px;
  height: 24px;
  overflow: hidden;
  position: relative;

  .description {
    position: absolute;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
  }
}
</style>