import {getRouteList,routes} from "@/router/permission";
import { createRouter, createWebHistory } from 'vue-router'
import {message} from "ant-design-vue";

let router
export function createVueRouter(){
  const history = createWebHistory(
    window.__POWERED_BY_QIANKUN__ ? process.env.VUE_APP_QIANKUN_PUBLIC_PATH : process.env.VUE_APP_PUBLIC_PATH
  )
  //获取所有的路由
  for (let i of getRouteList()){
    routes.push(i)
  }
  router = createRouter({
    history,
    routes,
    scrollBehavior() {
      // 始终滚动到顶部
      return { top: 0 }
    }
  })

  // 设置登录过期时间（3分钟）
  let EXPIRESTIME = 10*60*1000

  //路由守卫
  router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    let time = localStorage.getItem('time')
    console.log(time)
    // const role = localStorage.getItem('ms_username');
    // NProgress.start(); //进度条
    if (to.name !== 'Login' && !token) { //如果未登录且路由跳转的不是登陆页面
      if (to.name==='AllFunction'||to.name==='WordToPdf'||to.name==='ForgetPassword'){ //放行首页和word转pdf页
        next()
      }else {
        message.warn("此功能登陆后才能使用！")
        //next('/login'); //跳转到登陆页面
      }
    } else {
      let date = new Date().getTime();
      // 如果大于就是过期了，如果小于或等于就还没过期

      console.log(date-time)

      if (time&&(date - time>EXPIRESTIME)){
        message.warn("登陆过期，请重新登陆")
        localStorage.removeItem('token')
        localStorage.removeItem('time')
        router.push('/')
      }else {
        if (to.name === 'Login' && token) {  //如果已经登陆且要跳转到登陆页面
          message.warn("您已登陆，无需再次登陆！")
          router.push('/')
        } else {
          next();
        }
      }
    }
  });

  return router
}

export default createVueRouter()

export function useRouter() {
  return router
}

