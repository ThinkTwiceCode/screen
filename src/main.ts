import { createApp } from 'vue';

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'nprogress/nprogress.css';
import './styles/index.less';

import { router } from './router/index';
import { i18n } from './i18n/index';

import { createDevicePlugin } from './plugins/device';

import App from './App.vue'

createApp(App)
.use(router)
.use(i18n)
.use(createDevicePlugin())
.mount('#app');
