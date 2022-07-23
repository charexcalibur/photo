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
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/home' },
        { path: '/about', component: '@/pages/about' },
        {
          path: '/share/:id',
          component: '@/pages/share',
        },
      ],
    },
  ],
  fastRefresh: {},
  hash: true,
  analytics: {
    baidu: code.baidu,
    ga: code.ga,
  },
})
