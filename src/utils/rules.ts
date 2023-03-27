import { $t } from '@/i18n/index';

import type { FormItemRule } from 'element-plus';

export type FormValidateTrigger = 'blur' | 'change';

export function createInputRule(trigger:FormValidateTrigger = 'blur'): FormItemRule {
  return {
    required: true,
    trigger,
    message: $t('common.hint.requiredField'),
  };
}

export function createMaxLengthRule(min:number = 0, max:number = 10, trigger:FormValidateTrigger = 'blur'): FormItemRule {
  return {
    trigger,
    min,
    max,
    message: $t('common.hint.lengthLimit', { min, max }),
  };
}
