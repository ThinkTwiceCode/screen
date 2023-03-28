<template>
  <div class="page-container page-barrage">
    <ElAlert v-if="isPortraitMode" type="warning">{{ t('barrage.hint.pleaseRotateScreen') }}</ElAlert>
  
    <div class="barrage-wrap">
      <TextBarrage
        ref="textBarrageNode"
        :text="text"
        :size="textSize"
        :speed="scrollSpeed"
        :text-color="color.text"
        :background-color="color.background"
      />
    </div>

    <ConfigItem :title="t('barrage.hint.pleaseEnterText')">
      <SimpleInput v-model="text" />
    </ConfigItem>

    <ConfigItem :title="t('barrage.label.textSize')">
      <div class="slider-wrap">
        <ElSlider
          v-model="textSize"
          :min="12"
          :max="100"
        />

        <span class="value-text">{{ `${textSize}px` }}</span>
      </div>
    </ConfigItem>

    <ConfigItem :title="t('barrage.label.scrollSpeed')">
      <div class="slider-wrap">
        <ElSlider
          v-model="scrollSpeed"
          :min="10"
          :max="500"
          :step="10"
        />

        <span class="value-text">{{ `${scrollSpeed}px/s` }}</span>
      </div>
    </ConfigItem>

    <ConfigItem :title="t('barrage.label.colorPicker')">
      <div class="color-picker">
        <ElColorPicker v-model="color.text" show-alpha />
        <span class="label">{{ t('barrage.label.textColor') }}</span>
      </div>
      
      <div class="color-picker">
        <ElColorPicker v-model="color.background" show-alpha />
        <span class="label">{{ t('barrage.label.backgroundColor') }}</span>
      </div>
    </ConfigItem>

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

import {
  ElSlider, ElColorPicker, ElButton,
  ElAlert,
} from 'element-plus';

import {
  ref, reactive,
} from 'vue';
import { t } from '@/i18n/index';

import { useScreenOrientation } from '@/uses/use-screen-orientation';

const isPortraitMode = useScreenOrientation(); // 是否竖屏模式

const text = ref('Hello');
const textSize = ref(30);
const scrollSpeed = ref(30);
const color = reactive({
  text: '#222',
  background: '#fff',
});

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