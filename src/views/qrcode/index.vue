<template>
  <div class="page-container page-qrcode">
    <div ref="QRCodeWrapEl" class="qrcode-wrap">
      <img v-if="imageDataUrl" ref="imageEl" :src="imageDataUrl" />
    </div>

    <DoubleColorPicker
      v-model:foreground-color="color.foreground"
      v-model:background-color="color.background"
    />

    <SliderItem v-model="width" :title="$t('common.label.width')" :min="64" :max="2048" :step="32" />
    <SliderItem v-model="margin" :title="$t('common.label.margin')" :min="0" :max="50" />
    <ElInput v-model="text" type="textarea" :autosize="{ minRows: 2 }" />

    <div class="button-group">
      <ElButton
        type="primary"
        class="w-100-percent"
        @click="generateQRCodeImage()"
      >{{ $t('common.action.generate') }}</ElButton>

      <ElButton
        type="primary"
        class="w-100-percent"
        @click="saveQRCodeImage()"
      >{{ $t('common.action.save') }}</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoubleColorPicker from '@/components/double-color-picker.vue';
import SliderItem from '@/components/slider-item.vue';

import { ref, reactive, onMounted } from 'vue';
import { useEventListener } from '@vueuse/core';
import { ElInput, ElButton } from 'element-plus';
import { toDataURL } from 'qrcode';

import { saveDataUrlToImage } from '@/utils/file';

import type { Ref } from 'vue';
import type { QRCodeToDataURLOptions } from 'qrcode';

const color = reactive({
  foreground: '#000',
  background: '#fff',
});
const margin = ref(4);
const width = ref(100);
const text = ref('Hello World!\n你好，世界！');
const imageDataUrl = ref('');

const QRCodeWrapEl = ref() as Ref<HTMLElement>;
const imageEl = ref() as Ref<HTMLElement>;

function getQRCodeToDataURLOptions(): QRCodeToDataURLOptions {
  return {
    type: 'image/png',
    errorCorrectionLevel: 'H',
    margin: margin.value,
    width: width.value,
    color: {
      dark: color.foreground,
      light: color.background,
    },
  };
}

function generateQRCodeImage() {
  toDataURL(text.value, getQRCodeToDataURLOptions())
    .then((url) => {
      imageDataUrl.value = url;
    });
}

function saveQRCodeImage() {
  toDataURL(text.value, getQRCodeToDataURLOptions(), (err, url) => {
    if (err) {
      alert(err.message);
      return;
    }

    saveDataUrlToImage(url);
  });
}

function updateWidth() {
  width.value = Math.min(QRCodeWrapEl.value.offsetWidth, 420);
}

onMounted(() => {
  updateWidth();
  generateQRCodeImage();
});

useEventListener('resize', () => {
  generateQRCodeImage();
});
</script>
<script lang="ts">
export default { name: 'PageQRCode' };
</script>

<style scoped lang="less">
.page-qrcode {
  text-align: center;

  > * + * {
    margin-top: var(--am-margin-m);
  }
}
.qrcode-wrap {
  width: 100%;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 420px;
    object-fit: contain;
    box-shadow: -3px 3px 9px -2px var(--am-color-black-light);
  }
}
</style>