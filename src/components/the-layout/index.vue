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

      <div class="main-technique">
        <h3 class="title">{{ $t('common.label.mianTechnique') }}</h3>

        <a
          v-for="(technique) in MainTechniqueList"
          class="technique-item"
          target="_blank"
          :href="technique.href"
        >
          <img class="icon" :src="technique.icon" />
          <span class="name">{{ technique.name }}</span>
        </a>
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

import IconVue from '@/assets/icon-svg/vue.svg';
import IconVueUse from '@/assets/icon-svg/vue-use.svg';
import IconVite from '@/assets/icon-svg/vite.svg';
import IconTypeScript from '@/assets/icon-svg/typescript.svg';
import IconElmentPlus from '@/assets/icon-img/element-plus.png';

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
import { WebsiteLink } from '@/config/website-link';

import { useAppConfigStorage } from '@/uses/use-app-config-storage';

type PropsType = {
  showMenu?: boolean,
  showBack?: boolean,
};
withDefaults(defineProps<PropsType>(), {
  showMenu: true,
  showBack: false,
});

const MainTechniqueList = [
  { name: 'Vite', href: WebsiteLink.Vite, icon: IconVite },
  { name: 'Vue3', href: WebsiteLink.Vue3, icon: IconVue },
  { name: 'VueUse', href: WebsiteLink.VueUse, icon: IconVueUse },
  { name: 'TypeScript', href: WebsiteLink.TypeScript, icon: IconTypeScript },
  { name: 'ElmentPlus', href: WebsiteLink.ElmentPlus, icon: IconElmentPlus },
];

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
  console.log('VITE_TEST: ', import.meta.env.VITE_TEST);
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

.main-technique {
  margin-top: var(--am-margin-m);

  > .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: var(--am-margin-s);
  }

  > .technique-item {
    margin-top: var(--am-margin-s);
    display: inline-flex;
    align-items: center;

    .icon {
      height: 24px;
      margin-right: var(--am-margin-s);
    }

    & + .technique-item {
      margin-left: var(--am-margin-s);
    }
  }
}
</style>