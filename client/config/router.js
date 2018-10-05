import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    mode: 'history',
    // 如果浏览器不支持history，则自动转为hash
    // fallback: true,
    // base: '/base/',
    // linkActiveClass: 'active-link',
    // linkExactActiveClass: 'exact-active-link',
    routes
  })
}
