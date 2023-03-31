<template>
  <div class="the-header">
    <div class="left">
      <slot name="left" />
    </div>

    <div class="title-wrap">
      <h2 class="title">{{ $t('app.title') }}</h2>
      <h3 class="subtitle">{{ $t('app.subtitleDetails.variant') }}</h3>
    </div>

    <DarkButton class="right" />
  </div>
</template>

<script setup lang="ts">
</script>
<script lang="ts">
export default { name: 'TheHeader' };
</script>

<style scoped lang="less">
.the-header {
  display: flex;
  align-items: center;
  height: var(--am-header-height);
  padding: 0 var(--am-padding-m);
  background: var(--am-primary-color);

  .left {
    height: 30px;
    width: 30px;
    text-align: center;
    margin-right: var(--am-padding-m);

    :deep(img) {
      height: 100%; 
      object-fit: contain;
      cursor: pointer;
    }
  }

  .title-wrap {
    color: var(--am-color-white);

    .title {
      font-size: 16px;
      font-weight: 600;
    }

    .subtitle {
      font-size: 12px;
      font-weight: 300;
    }
  }

  .right {
    margin-left: auto;
  }
}
</style>