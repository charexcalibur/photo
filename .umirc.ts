/*
 * @Description: Description
 * @Author: hayato
 * @Date: 2021-03-06 16:20:25
 * @LastEditors: hayato
 * @LastEditTime: 2022-08-08 22:14:31
 */
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
    { path: '/about', exact: true, component: '@/pages/about' },
    {
      path: '/:id',
      exact: true,
      component: '@/pages/share',
    },
  ],
  fastRefresh: {},
  hash: true,
  analytics: {
    baidu: code.baidu,
    ga: code.ga,
  },
})
