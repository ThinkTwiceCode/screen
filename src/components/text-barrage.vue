<template>
  <div class="text-barrage">
    <div
      ref="textEl"
      class="text"
      :style="textStyle"
    >{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import {
  withDefaults, defineProps,
  ref, reactive,
  watch,
  nextTick,
  onMounted,
} from 'vue';
import { debounce } from 'lodash';

import type { Ref } from 'vue';

type PropsType = {
  text: string,
  size?: number,
  speed?: number,
};
const props = withDefaults(defineProps<PropsType>(), {
  size: 15,
  speed: 15,
});

const textEl = ref() as Ref<HTMLElement>;
const textWidth = ref<number>(0);

const textStyle = reactive({
  width: 'unset',
  fontSize: `${props.size}px`,
})

function updateTextStyle() {
  Object.assign(textStyle, {
    width: `${textWidth.value}px`,
    fontSize: `${props.size}px`,
  })
}

function getWidthByText() {
  const node = textEl.value.cloneNode() as HTMLElement;
  node.textContent = props.text;
  node.style.width = '0px';
  node.style.height = '0px';
  node.style.fontSize = `${props.size}px`,
  document.body.appendChild(node);
  const width = node.scrollWidth;
  document.body.removeChild(node);
  node.remove();
  console.log('width: ', width);
  return width;
}

function updateTextWidth() {
  textWidth.value = getWidthByText();
}

function updateAnimate() {
  textEl.value.getAnimations().forEach((anim) => {
    anim.cancel();
  });

  if (!props.text) {
    return;
  }

  const width = textWidth.value;
  const keyframes: Keyframe[] = [
    { left: '100%' },
    { left: `-${width}px` },
  ];
  const options: KeyframeAnimationOptions = {
    duration: Number((width * 1000 / props.speed).toFixed(2)),
    iterations: Infinity,
    easing: 'linear',
    fill: 'backwards',
  };

  console.log('new animate options: ', { ...options });
  
  textEl.value.animate(keyframes, options);
}

async function notifyUpdate() {
  await nextTick(updateTextWidth);
  updateTextStyle();
  await nextTick(updateAnimate);
}

onMounted(() => {
  watch(props, debounce(notifyUpdate, 200), { immediate: true, deep: true });
});
</script>
<script lang="ts">
export default { name: 'TextBarrage' };
</script>

<style scoped lang="less">
.text-barrage {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background: #fff;

  .text {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
