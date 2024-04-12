// import store from '@/store';
// import welcome from '@/views/Menu';
// const LOGIN_PATH = '/login';
// const WELCOME_PATH = '/welcome';
/**
 * 获取router目录中已配置的路由表信息(*.router.config.js文件)
 * @returns routeList
 */
export function  getRouteList() {
  let routeList = []
  function importRouterConfig(r) {
    r.keys().forEach(key => {
      const dft = r(key).default
      if (Array.isArray(dft)) {
        routeList = routeList.concat(dft)
      } else {
        routeList.push(dft)
      }
    })
  }
  // require.context(文件路径, 是否递归查找子文件夹, 定义正则匹配文件名)ƒ
  importRouterConfig(
    require.context('../router/', true, /\.router\.config\.js/)
  )
  return routeList
}

export const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "fail" */ '@/views/Login.vue'),
    children: [...getRouteList()]
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/',
    name: 'Basic',
    component: ()=>import(/* webpackChunkName: "fail" */'@/views/Welcome'),
    redirect: '/AllFunction', // 默认跳转地址
    children: [...getRouteList()]
  }
]

// export function permission(to, from, next) {
//   const token = store.state.user.token
//   // if (!token && to.path !== LOGIN_PATH) {
//   //   // 未登录状态直接跳转到登录页面,并记录当前地址,登录后自动跳转
//   //   window.location.href = `${process.env.VUE_APP_PUBLIC_PATH}login?redirect=${to.path}`
//   // } else
//   if (to.matched.length === 0) {
//     // 访问未注册路由,跳转404页面
//     next({ name: '404' })
//   } else if (token && to.path === LOGIN_PATH) {
//     // 已登录状态访问登录页面,回调欢迎页面
//     next({ path: WELCOME_PATH })
//   }
//   // 服务端生成权限路由或前端对比权限路由
//   else if (store.state.user.initMenuList === false && to.path !== LOGIN_PATH) {
//     store.dispatch('user/LoadUserRolesData').then(next, next)
//   } else {
//     next()
//   }
// }

