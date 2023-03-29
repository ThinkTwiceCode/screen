<template>
  <div class="the-layout">
    <TheHeader class="the-header">
      <template v-if="$route.name" #left>
        <Transition name="scale" mode="out-in">
          <img
            v-if="$route.name === $routerName.Root"
            class="header-left"
            :src="IconMenuToRight"
            @click="showDrawer()"
          />
          <img
            v-else
            class="header-left"
            :src="IconBack"
            @click="backToRoot()"
          />
      </Transition>
      </template>
    </TheHeader>

    <ElDrawer
      v-model="drawer"
      direction="ltr"
      :size="200"
      :title="$t('app.slogan')"
    >
      <div class="switch-list">
        <label class="switch-item">
          <span class="label">{{ $t('common.label.darkMode') }}</span>
          <ElSwitch v-model="appConfigStorage.darkMode" />
        </label>
      </div>
    </ElDrawer>

    <main class="the-main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheHeader from './header.vue';

import IconMenuToRight from '@/assets/icon-svg/menu-to-right.svg';
import IconBack from '@/assets/icon-svg/back.svg';

import {
  withDefaults, defineProps,
  ref,
  watch,
  onMounted,
} from 'vue';
import { ElSwitch } from 'element-plus';
import { useRouter } from 'vue-router';
import { ElDrawer } from 'element-plus';

import { RouterName } from '@/config/router';

import { useAppConfigStorage } from '@/uses/use-app-config-storage';

type PropsType = {
  showMenu?: boolean,
  showBack?: boolean,
};
withDefaults(defineProps<PropsType>(), {
  showMenu: true,
  showBack: false,
});

const appConfigStorage = useAppConfigStorage();

const drawer = ref(false);

const router = useRouter();

function showDrawer() {
  drawer.value = true;
}

function backToRoot() {
  router.replace({
    name: RouterName.Root,
  });
}

onMounted(() => {
  watch(() => appConfigStorage.darkMode, (val) => {
    console.log('darkMode: ', val);
    const darkClassName = 'dark';
    if (val) {
      document.documentElement.classList.add(darkClassName);
    } else {
      document.documentElement.classList.remove(darkClassName);
    }
  }, { immediate: true });
})
</script>
<script lang="ts">
export default { name: 'TheLayout' };
</script>

<style scoped lang="less">
.the-layout {
  min-height: 100vh;
}

.switch-list {
  .switch-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>