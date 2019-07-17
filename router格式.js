import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

const Index = resolve => require(['@/components/index'], resolve)
//异步加载


Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [{
		path: '/index',
		name: 'index',
		meta: {
			
		},
		component: () =>
			import('@/view/index.vue')  //非异步加载   不推荐
	}]
})


//钩子拦截函数
/*
	1.使用token
	2.使用session
	3.localstorage
*/
router.beforeEach((to, from, next) => {  //钩子拦截函数
	if(Store.state.user.token && to.name === 'login') {
		next({
			name: 'admin'
		})
	} else if(!Store.state.user.token && to.meta.requireAuth) {
		next({
			name: 'login'
		})
	} else {
		next()
	}
})

router.beforeEah((to, from, next) => {
	//主要是用于判断是否登陆
	//token || session
	if(token) {
		if(to.name === 'login') {
			
		} else {
			
		}
	} else {
		if(to.name === 'login') {
			
		} else {
			
		}
	}
})

export default router