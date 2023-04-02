<template>
  <div class="page-container page-barrage">
    <div class="barrage-wrap">
      <TextBarrage
        ref="textBarrageNode"
        :text="barrageStorage.text"
        :size="barrageStorage.fontSize"
        :speed="barrageStorage.scrollSpeed"
        :text-color="barrageStorage.color"
        :background-color="barrageStorage.backgroundColor"
      />
    </div>

    <ConfigItem :title="t('barrage.hint.pleaseEnterText')">
      <SimpleInput v-model="text" @blur="onInputBlur()"/>
    </ConfigItem>

    <ConfigItem :title="t('barrage.label.textSize')">
      <div class="slider-wrap">
        <ElSlider
          v-model="barrageStorage.fontSize"
          :min="12"
          :max="100"
        />

        <span class="value-text">{{ `${barrageStorage.fontSize}px` }}</span>
      </div>
    </ConfigItem>

    <ConfigItem :title="t('barrage.label.scrollSpeed')">
      <div class="slider-wrap">
        <ElSlider
          v-model="barrageStorage.scrollSpeed"
          :min="10"
          :max="500"
          :step="10"
        />

        <span class="value-text">{{ `${barrageStorage.scrollSpeed}px/s` }}</span>
      </div>
    </ConfigItem>

    <DoubleColorPicker
      show-alpha
      v-model:foreground-color="barrageStorage.color"
      v-model:background-color="barrageStorage.backgroundColor"
      :foreground-text="t('barrage.label.textColor')"
      :background-text="t('barrage.label.backgroundColor')"
    />

    <ElButton
      type="primary"
      class="w-100-percent"
      @click="fullScreenDisplay()"
    >{{ t('barrage.button.fullScreenDisplay') }}</ElButton>
  </div>
</template>

<script setup lang="ts">
import ConfigItem from './components/config-item.vue';

import SimpleInput from '@/components/input/simple.vue';
import TextBarrage from '@/components/text-barrage.vue';
import DoubleColorPicker from '@/components/double-color-picker.vue';

import {
  ElSlider, ElButton,
} from 'element-plus';

import {
  ref,
} from 'vue';
import { t } from '@/i18n/index';

import { useBarrageStorage } from '@/uses/use-barrage-storage';

const barrageStorage = useBarrageStorage();

const text = ref(barrageStorage.text);

function onInputBlur() {
  barrageStorage.text = text.value;
}

const textBarrageNode = ref();

function fullScreenDisplay() {
  textBarrageNode.value.enterFullScreenDisplay();
}
</script>
<script lang="ts">
export default { name: 'PageBarrage' };
</script>

<style scoped lang="less">
.page-barrage {
  > * {
    + * {
      margin-top: var(--am-margin-m);
    }
  }
}

.barrage-wrap {
  border: 1px solid var(--am-primary-color);
  border-radius: var(--am-border-corner-m);
  overflow: hidden;
}

.slider-wrap {
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

.color-picker {
  display: inline-flex;
  align-items: center;

  & + .color-picker {
    margin-left: var(--am-margin-l);
  }

  .label {
    margin-left: var(--am-margin-m);
  }
}
</style>