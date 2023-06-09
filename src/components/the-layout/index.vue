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
            @click="navigateBack($router)"
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
      <a
        class="github-link"
        target="_blank"
        :href="WebsiteLink.CurrentGithubProject"
      >
        <img :src="IconGithub" />
        <span class="label">Github</span>
      </a>

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

import IconGithub from '@/assets/icon-svg/github.svg';
import IconVue from '@/assets/icon-svg/vue.svg';
import IconVueUse from '@/assets/icon-svg/vue-use.svg';
import IconVite from '@/assets/icon-svg/vite.svg';
import IconTypeScript from '@/assets/icon-svg/typescript.svg';
import IconElmentPlus from '@/assets/icon-img/element-plus.png';

import {
  withDefaults, defineProps,
  ref,
} from 'vue';
import { ElDrawer } from 'element-plus';

import { WebsiteLink } from '@/config/website-link';
import { navigateBack } from '@/helps/navigation';

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

const drawer = ref(false);

function showDrawer() {
  drawer.value = true;
}
</script>
<script lang="ts">
export default { name: 'TheLayout' };
</script>

<style scoped lang="less">
.the-layout {
  min-height: 100vh;
}

.github-link {
  display: flex;
  align-items: center;
  height: 50px;

  img {
    width: 24px;
  }

  .label {
    margin-left: var(--am-margin-s);
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