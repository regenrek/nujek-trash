import { sortRoutes } from '@nuxt/utils'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nujek-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    'aaa/dist/main.css'
  ],

  buildModules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
    '@nujek/ui',
    [
      '@nujek/storyblok',
      {
        storyblokConfig: {
          accessToken: process.env.SB_CLIENT_ACCESS_TOKEN,
          oAuthToken: process.env.SB_MANAGEMENT_OAUTH_TOKEN,
          spaceId: process.env.SB_SPACE_ID,
          defaultLanguage: process.env.SB_DEFAULT_LANGUAGE || 'en',
          cacheProvider: 'memory',
          version: 'auto',
          disableManagementApi: true
        },
        debug: true
      }
    ]
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['@nujek/ui/css/nujek-ui.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  components: [{ path: '~/components', pathPrefix: false, prefix: '' }],

  /**
   * Nuxt custom router config
   */
  router: {
    extendRoutes (routes, resolve) {
      const routesToAdd = [
        {
          name: 'index',
          path: '/',
          component: resolve(__dirname, 'pages/_slug/index.vue'),
          chunkName: 'pages/index'
        },
        {
          name: 'cafes',
          path: '/cafes',
          component: resolve(__dirname, 'pages/_slug/index.vue'),
          chunkName: 'pages/cafe/index'
        }
      ]

      const existingRoutesToRemove = routesToAdd.map(route => route.name)

      const generateRoutes = routes.filter((route) => {
        return !existingRoutesToRemove.includes(route.name)
      })

      routesToAdd.forEach(({ name, path, component, chunkName }) => {
        generateRoutes.push({
          name,
          path,
          component,
          chunkName
        })
      })

      routes.splice(0, routes.length, ...generateRoutes) // set new array

      sortRoutes(routes)
    }
  }
}
