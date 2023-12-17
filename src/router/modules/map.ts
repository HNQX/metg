export default {
  path: 'map',
  name: 'map',
  component: () => import('@/views/map/index.vue'),
  meta: {
    locale: 'menu.map',
    requiresAuth: true,
    icon: 'icon-tiktok-color',
  },
  children: [
    {
      path: 'map-leaflet', // The midline path complies with SEO specifications
      name: 'mapLeaflet',
      component: () => import('@/views/map/leaflet/index.vue'),
      meta: {
        locale: 'menu.map.leaflet',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'map-earth', // The midline path complies with SEO specifications
      name: 'mapEarth',
      component: () => import('@/views/map/earth/index.vue'),
      meta: {
        locale: 'menu.map.earth',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}
