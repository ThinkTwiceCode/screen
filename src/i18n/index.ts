import { createI18n } from 'vue-i18n';
import { Locale } from '@/consts/locale';

import { zh_CN } from './zh-CN/index';
import { en_US } from './en-US/index';


export const i18n = createI18n({
  locale: Locale.ZH_CN,
  fallbackLocale: Locale.ZH_CN,
  messages: {
    [Locale.ZH_CN]: zh_CN,
    [Locale.EN_US]: en_US,
  },
});

export const $t = i18n.global.t.bind(i18n);
export const t = $t;

export function namespaceT(prefix: string) {
  if (typeof prefix !== 'string') {
    return $t;
  }

  return (path: string, arg: any) => {
    return $t(`${prefix}.${path}`, arg);
  }
}

/**
 * 根据语言环境，返回不同的值，默认返回中文值
 * @param cnVal - 中文值，任意值或返回任意值的函数
 * @param enVal - 英文值，任意值或返回任意值的函数
 */
export function valueByLocale(cnVal: any, enVal: any): any {
  if (i18n.global.locale === Locale.EN_US) {
    return typeof enVal === 'function' ? enVal() : enVal;
  }

  return typeof cnVal === 'function' ? cnVal() : cnVal;
}
