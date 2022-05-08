import { defineConfig } from 'umi'
const code = require('./analytics.json')

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  hash: true,
  analytics: {
    baidu: code.baidu,
    ga: code.ga,
  },
})
