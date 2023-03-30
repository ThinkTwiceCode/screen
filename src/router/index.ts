import { reactive, nextTick } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import { useTitle } from '@vueuse/core';
import { ElLoading } from 'element-plus';

import { RouterName } from '@/config/router';
import { $t } from '@/i18n/index';

import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

type RouteRecordExtra = {
  meta?: {
    activeRouterName?: string, // 当前激活的路由，用于侧边栏显示选中菜单
    title?: (() => string),
    hideInSidebar?: boolean,
    hideSidebar?: boolean, // 隐藏侧边栏，如404等页面
  },
}

export type TheRoutesType = Array<RouteRecordRaw & RouteRecordExtra>;

export const routes:TheRoutesType = [
  {
    name: RouterName.Root,
    path: '/',
    component: () => import('@/views/root/index.vue'),
  },
  // 系统设置
  {
    name: RouterName.Settings,
    path: '/settings',
    component: () => import('@/views/settings/index.vue'),
    meta: {
      title: () => $t('app.page.settings'),
    }
  },
  // 弹幕
  {
    name: RouterName.Barrage,
    path: '/barrage',
    component: () => import('@/views/barrage/index.vue'),
    meta: {
      title: () => $t('barrage.title'),
    }
  },
  // 时钟
  {
    name: RouterName.Clock,
    path: '/clock',
    component: () => import('@/views/clock/index.vue'),
    meta: {
      title: () => $t('clock.title'),
    }
  },
  // 画布
  {
    name: RouterName.Draw,
    path: '/draw',
    component: () => import('@/views/draw/index.vue'),
    meta: {
      title: () => $t('draw.title'),
    }
  },
  // 测试
  {
    name: RouterName.Test,
    path: '/test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: () => $t('app.page.test'),
      hideInSidebar: true,  
      hideSidebar: true,
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior(to, from,savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return {
  //     top: 0,
  //     behavior: 'smooth',
  //   };
  // }
});

let nprogressTimer:any = null;
let elLoadingInstance:any = null;
const $page = reactive({
  rendering: false, // 页面渲染中
});

const originRouteInstall = router.install;

router.install = function (app: App<any>) {
  originRouteInstall.call(router, app);
  app.config.globalProperties.$page = $page;
  app.config.globalProperties.$routerName = RouterName;
}

router.beforeEach(async (_to, _from, next) => {
  elLoadingInstance = ElLoading.service();
  $page.rendering = true;
  NProgress.start(); // 顶部进度条 - 开始
  nprogressTimer = setInterval(() => {
    NProgress.inc();
  }, 100);
  next();
});

const documentTitle = useTitle($t('app.title'), { titleTemplate: `%s | ${$t('app.slogan')}` });
router.afterEach((_to) => {
  // 随路由变化而更改文档标题
  if (typeof _to.meta?.title === 'function') {
    const titleText = _to.meta.title() || $t('app.title');
    documentTitle.value = titleText;
  } else {
    documentTitle.value = $t('app.title');
  }

  // 切换路由后，滚动到页面顶部
  if (window) {
    window.scrollTo(0, 0);
  }

  nextTick(() => {
    elLoadingInstance?.close?.();
    $page.rendering = false;
    clearInterval(nprogressTimer);
    NProgress.done(); // 顶部进度条 - 结束
  });
});

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $page: typeof $page;
    $routerName: typeof RouterName;
  }
}
