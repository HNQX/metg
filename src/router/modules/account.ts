export default {
  path: 'account',
  name: 'account',
  component: () => import('@/views/account/index.vue'),
  meta: {
    locale: 'menu.account',
    requiresAuth: true,
    icon: 'icon-archive',
  },
  children: [
    {
      path: 'account-manage', // The midline path complies with SEO specifications
      name: 'accountManage',
      component: () => import('@/views/account/manage/index.vue'),
      meta: {
        locale: 'menu.account.manage',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'account-bug', // The midline path complies with SEO specifications
      name: 'accountBug',
      component: () => import('@/views/account/buy/index.vue'),
      meta: {
        locale: 'menu.account.buy',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
