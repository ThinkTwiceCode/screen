<template>
  <ElTooltip
    effect="light"
    v-bind="$attrs"
  >
    <img :src="IconInfo" class="info-icon" :style="iconStyle" />
  </ElTooltip>
</template>

<script setup lang="ts">
import IconInfo from '@/assets/icon-svg/info.svg';

import { withDefaults, defineProps, computed } from 'vue';
import { ElTooltip } from 'element-plus';

type PropsType = {
  size?: number | string, // 控制图标大小，number类型时会自动转换为px
};
const props = withDefaults(defineProps<PropsType>(), {
  size: 16,
});

const iconStyle = computed(() => {
  const size = props.size;
  if (!props.size) return undefined;
  return {
    width: Number.isSafeInteger(size) ? `${size}px` : size,
  };
});
</script>
<script lang="ts">
export default { name: 'BubbleTip' };
</script>
