<template>
  <div
    ref="wrapEl"
    class="text-barrage"
    :style="{ backgroundColor }"
    @dblclick="onDoubleClick()"
  >
    <div
      ref="fullScreenTipEl"
      class="full-screen-tip"
    >{{ t('barrage.hint.dbclickToExitFullScreen') }}</div>
  
    <div
      ref="textEl"
      class="text"
      :style="textStyle"
    >{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  withDefaults, defineProps, defineExpose,
  ref, computed,
  watch,
  nextTick,
  onMounted,
} from 'vue';
import { useFullscreen } from '@vueuse/core';
import { debounce } from 'lodash';

import { t } from '@/i18n/index';

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

const wrapEl = ref() as Ref<HTMLElement>;
const fullScreenTipEl = ref() as Ref<HTMLElement>;
const textEl = ref() as Ref<HTMLElement>;

const textStyle = computed(() => {
  return {
    fontSize: `${props.size}px`,
    color: props.textColor,
  };
});

function updateAnimate() {
  textEl.value.getAnimations().forEach((anim) => {
    anim.cancel();
  });

  if (!props.text) {
    return;
  }

  const wrapWidth = wrapEl.value.offsetWidth;
  const textWidth = textEl.value.offsetWidth;
  const width = wrapWidth + textWidth;
  const duration = Number((width * 1000 / props.speed).toFixed(2));
  console.log('animate config: ', { wrapWidth, textWidth, speed: props.speed, duration});
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
  textEl.value.animate(keyframes, options);
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


const uFullScreen = useFullscreen(wrapEl);

function hideFullScreenTip() {
  fullScreenTipEl.value.style.display = 'none';
}
function showFullScreenTip() {
  fullScreenTipEl.value.style.display = 'block';
  fullScreenTipEl.value.getAnimations().forEach((anim) => {
    anim.cancel();
  });

  const animate = fullScreenTipEl.value.animate([
    { color: '#fff' },
    { color: '#000' },
    { color: '#fff' },
  ], {
    duration: 1000,
    iterations: 3,
    easing: 'linear',
    fill: 'backwards',
  });

  animate.addEventListener('finish', hideFullScreenTip);
}

function exitFullScreenDisplay() {
  uFullScreen.exit();
}
function enterFullScreenDisplay() {
  uFullScreen.enter();
  showFullScreenTip();
}

function onDoubleClick() {
  if (uFullScreen.isFullscreen.value) {
    exitFullScreenDisplay();
  } else {
    enterFullScreenDisplay();
  }
}
watch(uFullScreen.isFullscreen, (val) => {
  if (!val) {
    hideFullScreenTip();
  }
});

defineExpose({
  enterFullScreenDisplay,
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
  height: 200px;
  background: #fff;

  // &.rotate {
  //   transform: rotate(90deg);
  // }

  &:fullscreen {
    transform: rotate(90deg) !important;
  }

  .full-screen-tip {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 10px;
    font-size: 18px;
    font-weight: bold;
    display: none;
  }

  .text {
    position: absolute;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
