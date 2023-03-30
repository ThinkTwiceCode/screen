<template>
  <FullScreen
    ref="fullScreenEl"
    @resize="onResize"
  >
    <div
      class="text-barrage"
      :style="{ backgroundColor }"
    >
      <div
        ref="textEl"
        class="text"
        :style="textStyle"
      >{{ text }}</div>
    </div>
  </FullScreen>
</template>

<script setup lang="ts">
import FullScreen from '@/components/full-screen.vue';

import {
  withDefaults, defineProps, defineExpose,
  ref, computed,
  watch,
  nextTick,
  onMounted,
} from 'vue';
import { debounce } from 'lodash';

import { useAnimate } from '@/uses/use-animate';

import type { Ref } from 'vue';

type PropsType = {
  text: string,
  size?: number,
  speed?: number,
  textColor?: string,
  backgroundColor?: string,
};
const props = withDefaults(defineProps<PropsType>(), {
  size: 15,
  speed: 15,
});

const wrapSize = { width: 0, height: 0 };

const fullScreenEl = ref();
const textEl = ref() as Ref<HTMLElement>;

const textAnimate = useAnimate(textEl);

const textStyle = computed(() => {
  return {
    fontSize: `${props.size}px`,
    color: props.textColor,
  };
});

function updateAnimate() {
  textAnimate.cancel();

  if (!props.text) {
    return;
  }

  const wrapWidth = wrapSize.width;
  const textWidth = textEl.value.offsetWidth;
  const width = wrapWidth + textWidth;
  const duration = Number((width * 1000 / props.speed).toFixed(2));
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

function onResize(width: number, height: number) {
  wrapSize.width = width;
  wrapSize.height = height;
  updateAnimate();
}

async function notifyUpdate() {
  await nextTick(updateAnimate);
}

onMounted(() => {
  watch(
    () => [props.text, props.size, props.speed],
    debounce(notifyUpdate, 200),
    { immediate: true, deep: true },
  );
});

defineExpose({
  enterFullScreenDisplay: () => {
    fullScreenEl.value.enterFullScreenDisplay();
  },
});
</script>
<script lang="ts">
export default { name: 'TextBarrage' };
</script>

<style scoped lang="less">
.text-barrage {
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;

  .text {
    position: absolute;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
  }
}
</style>
