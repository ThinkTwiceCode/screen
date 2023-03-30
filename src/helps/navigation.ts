import type { Router } from 'vue-router';

import { RouterName, FROM_ROUTE_NAME_KEY } from '@/config/router';

export function navigateBack(router: Router, targetRouteName?: string) {
  const { meta = {} } = router.currentRoute.value;
  const from = meta[FROM_ROUTE_NAME_KEY];
  if (from) {
    if (targetRouteName && targetRouteName !== from) {
      router.replace({ name: targetRouteName });
    } else {
      router.back();
    }
    return;
  }

  router.replace({ name: RouterName.Root });
}
