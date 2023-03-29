<template>
  <BaseCard
    :to="{ name: $routerName.Root }"
    :icon="Icon"
    :title="$t('common.hint.inDevelopment')"
  >
    <template #description>
      <div ref="descriptionWrapEl" class="description-wrap">
        <div ref="descriptionEl" class="description">{{ $t('common.hint.moreFeaturesUnderDevelopment') }}</div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from './index.vue';

import Icon from '@/assets/icon-svg/in-development.svg';
</script>
<script lang="ts">
export default { name: 'CardInDevelopment' };
</script>

<style scoped lang="less">
.description-wrap {
  width: 100%;
  line-height: 24px;
  height: 24px;
  overflow: hidden;
  position: relative;

  .description {
    position: absolute;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
  }
}
</style>