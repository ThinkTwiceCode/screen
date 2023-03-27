import { get } from 'lodash';
import type { Router } from 'vue-router';

import { RouterName, FROM_ROUTE_NAME_KEY } from '@/config/router';

export function goBack(router: Router) {

  const from = get(router.currentRoute.value, `meta.${FROM_ROUTE_NAME_KEY}`) as string;
  if (from) {
    router.replace({ name: from });
    return;
  }

  router.replace({ name: RouterName.Root });
}
