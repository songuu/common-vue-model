import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: []
})

const constantRouterMap = [] // 默认的路由规则，比如登录页（非权限页）
router.$addRoutes = (params) => {
    router.matcher = new VueRouter({ // 重置路由规则
        routes: constantRouterMap
    }).matcher
    router.addRoutes(params) // 添加路由
}

router.onReady(() => {
    const status = true // 判断用户已登录且已有权限
    if (status) {
        store.dispatch('getJurisdiction') // 请求动态路由
            .then(e => {
                router.addRoutes(e.list) // 添加动态路由,这里不必用$addRoutes，因为刷新后就没有上一次的动态路由，故不必清除
            })
    }
})


export default router