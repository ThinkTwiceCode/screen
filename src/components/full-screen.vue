<template>
  <div
    ref="wrapEl"
    class="full-screen-wrap"
    @dblclick="onDoubleClick()"
  >
    <div class="content-wrap">
      <slot />
    </div>

    <div
      ref="tipEl"
      class="tip"
    >
      {{ $t('common.hint.dbclickToExitFullScreen') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineEmits, defineExpose,
  ref,
  computed, watch,
  onMounted,
} from 'vue';
import { useFullscreen, useResizeObserver } from '@vueuse/core';

import { useAnimate } from '@/uses/use-animate';
import { useScreenOrientation } from '@/uses/use-screen-orientation';

import type { Ref } from 'vue';

const emit = defineEmits({
  resize: (width: number, height: number) => undefined,
});

const wrapEl = ref() as Ref<HTMLElement>;
const tipEl = ref() as Ref<HTMLElement>;

const wrapWidth = ref(0);
const wrapHeight = ref(0);
useResizeObserver(wrapEl, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  wrapWidth.value = width;
  wrapHeight.value = height;
  emit('resize', width, height);
});

const tipAnimate = useAnimate(tipEl, [
  { color: '#fff' },
  { color: '#000' },
  { color: '#fff' },
], {
  duration: 1000,
  iterations: 3,
  easing: 'linear',
  fill: 'backwards',
});

const uFullScreen = useFullscreen(wrapEl);
const isPortraitMode = useScreenOrientation();
const mockLandscapeFullscreenClassName = 'rotate';

function hideFullScreenTip() {
  tipEl.value.style.display = 'none';
}

function showFullScreenTip() {
  tipEl.value.style.display = 'block';
  tipEl.value.getAnimations().forEach((anim) => {
    anim.cancel();
  });

  const animate = tipAnimate.start();

  animate?.addEventListener('finish', hideFullScreenTip);
}

function exitFullScreenDisplay() {
  if (isPortraitMode.value) {
    hideFullScreenTip();
    wrapEl.value.classList.remove(mockLandscapeFullscreenClassName);
  } else {
    uFullScreen.exit();
  }
}

function enterFullScreenDisplay() {
  if (isPortraitMode.value) {
    wrapEl.value.classList.add(mockLandscapeFullscreenClassName);
  } else {
    uFullScreen.enter();
  }
  showFullScreenTip();
}

function onDoubleClick() {
  if (uFullScreen.isFullscreen.value || wrapEl.value.classList.contains(mockLandscapeFullscreenClassName)) {
    exitFullScreenDisplay();
  } else {
    enterFullScreenDisplay();
  }
}

onMounted(() => {
  watch(uFullScreen.isFullscreen, (val) => {
    if (!val) {
      hideFullScreenTip();
    }
  });
});

defineExpose({
  enterFullScreenDisplay,
});
</script>
<script lang="ts">
export default { name: 'FullScreen' };
</script>

<style scoped lang="less">
.full-screen-wrap {
  width: 100%;
  height: 200px;
  position: relative;

  // 竖屏的时候，为了模拟横向全屏显示，需要旋转后通过JS计算高宽
  &.rotate {
    position: fixed;
    width: 100vh;
    height: 100vw;
    top: 0;
    left: 0;
    transform: rotate(90deg) translateY(-100vw);
    transform-origin: 0 0;
    z-index: 1000;
  }

  > .content-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  > .tip {
    position: absolute;
    left: 0;
    top: 10px;
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    display: none;
  }
}
</style>
