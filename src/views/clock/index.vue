<template>
  <div
    ref="pageEl"
    class="page-container page-clock"
  >
    <Transition name="slide-down" mode="out-in">
      <!-- <div class="number-wrap"> -->
        <span :key="count">{{ count }}</span>
      <!-- </div> -->
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
} from 'vue';

import type { Ref } from 'vue';

const count = ref(0);

const pageEl = ref() as Ref<HTMLElement>;

// setInterval(() => {
//   count.value += 1;
// }, 1000);
</script>
<script lang="ts">
export default { name: 'PageClock' };
</script>

<style scoped lang="less">
span {
  display: inline-block;
  font-size: 30px;
}
</style>