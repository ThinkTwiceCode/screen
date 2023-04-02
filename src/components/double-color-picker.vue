<template>
  <div class="double-color-picker">
    <label
      ref="fgWrapEl"
      class="picker-wrap foreground"
      @click="openForegroundColorPicker"
    >
      <ElColorPicker
        v-model="color.foreground"
        :show-alpha="showAlpha"
        @change="onChangeForegroundColor"
      />
      <span class="label">{{ foregroundText }}</span>
    </label>

    <label
      ref="bgWrapEl"
      class="picker-wrap background"
      @click="openBackgroundColorPicker"
    >
      <ElColorPicker
        v-model="color.background"
        :show-alpha="showAlpha"
        @change="onChangeBackgroundColor"
      />
      <span class="label">{{ backgroundText }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps, defineEmits,
  ref, reactive,
  watch,
  onMounted,
} from 'vue';
import { ElColorPicker } from 'element-plus';

import { t } from '@/i18n/index';
import { addWaterRipple } from '@/uses/use-click-animate';

import type { Ref } from 'vue';

const props = defineProps({
  foregroundColor: {
    type: String,
    default: '#000',
  },
  backgroundColor: {
    type: String,
    default: '#fff',
  },
  foregroundText: {
    type: String,
    default: t('common.label.foregroundColor'),
  },
  backgroundText: {
    type: String,
    default: t('common.label.backgroundColor'),
  },
  showAlpha: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:foregroundColor', 'update:backgroundColor']);

const color = reactive({
  foreground: props.foregroundColor,
  background: props.backgroundColor,
});

watch(() => props.foregroundColor, (val) => {
  console.log('foregroundColor changed: ', val);
  color.foreground = val;
});
watch(() => props.backgroundColor, (val) => {
  console.log('backgroundColor changed: ', val);
  color.background = val;
});

function onChangeForegroundColor(val: string | null) {
  emit('update:foregroundColor', val);
}
function onChangeBackgroundColor(val: string | null) {
  emit('update:backgroundColor', val);
}

const fgWrapEl = ref() as Ref<HTMLElement>;
const bgWrapEl = ref() as Ref<HTMLElement>;

onMounted(() => {
  addWaterRipple([fgWrapEl.value, bgWrapEl.value]);
})

function onClickColorPickerWrap(e: Event, wrapEl: Ref<HTMLElement>) {
  const target = e.target as HTMLElement;
  const trigger = wrapEl.value.querySelector('.el-color-picker__trigger');
  if (!trigger || target === trigger || trigger.contains(target)) {
    return;
  }
  const evt = new Event('click', { bubbles: true, cancelable: true });
  trigger?.dispatchEvent(evt);
}

function openForegroundColorPicker(e: Event) {
  onClickColorPickerWrap(e, fgWrapEl);
}

function openBackgroundColorPicker(e: Event) {
  onClickColorPickerWrap(e, bgWrapEl);
}
</script>
<script lang="ts">
export default { name: 'DoubleColorPicker' };
</script>

<style scoped lang="less">
.double-color-picker {
  display: flex;
  height: 50px;
  border-radius: var(--am-border-corner-l);
  box-shadow: -1px 1px 3px 0 var(--am-text-color-light);
  overflow: hidden;

  > .picker-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 var(--am-padding-s);
    cursor: pointer;

    .label {
      margin-left: var(--am-margin-m);
    }
  }
}
</style>