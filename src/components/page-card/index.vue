<template>
  <RouterLink :to="to" class="page-card">
    <div class="top">
      <div class="icon-wrap">
        <img class="icon" :src="icon" />
      </div>
      <h3 class="title">{{ title }}</h3>
    </div>

    <div class="bottom">
      <slot name="description" />
      <template v-if="!$slots.description">{{ description }}</template>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type PropsType = {
  to: any,
  icon: string,
  title: string,
  description?: string,
};
defineProps<PropsType>();
</script>
<script lang="ts">
export default { name: 'BaseCard' };
</script>

<style scoped lang="less">
@icon-width: 20px;

.page-card {
  padding: var(--am-padding-s);
  border-radius: var(--am-border-corner-m);
  overflow: hidden;
  background: var(--am-bg-color-light);

  .top {
    display: flex;
    align-items: center;

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: @icon-width;
      height: @icon-width;

      .icon {
        max-width: @icon-width;
        max-height: @icon-width;
      }
    }
    
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-left: var(--am-margin-s);
    }
  }

  .bottom {
    width: calc(100% - @icon-width - var(--am-padding-s));
    margin-left: calc(@icon-width + var(--am-margin-s));
  }
}
</style>