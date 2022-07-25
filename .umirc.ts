import { defineConfig } from 'umi'
const code = require('./analytics.json')

export default defineConfig({
  // layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/home',
      exact: true,
    },
    {
      path: '/:id',
      exact: true,
      component: '@/pages/share',
    },
    { path: '/about', component: '@/pages/about' },
  ],
  fastRefresh: {},
  hash: true,
  analytics: {
    baidu: code.baidu,
    ga: code.ga,
  },
})
