<template>
  <div class="config-item">
    <h3 class="title">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type PropsType = {
  title: string,
};
defineProps<PropsType>();
</script>
<script lang="ts">
export default { name: 'ConfigItem' };
</script>

<style scoped lang="less">
.config-item {
  > .title {
    font-size: 16px;
    color: #333;
  }
}
</style>