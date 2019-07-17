//主要是重构axios函数

/*
 	1 
*/
import Axios from 'axios'
//import baseURL from '_conf/url'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import store from '@/store'

class httpRequest {
	constructor() {
		this.options = {
			method: '',
			url: ''
		}
		// 存储请求队列
		this.queue = {}
	}
	// 销毁请求实例
	destroy(url) {
		delete this.queue[url]
		const queue = Object.keys(this.queue)
		return queue.length
	}
	// 请求拦截
	interceptors(instance, url) {
		// 添加请求拦截器
		instance.interceptors.request.use(config => {
			return config			
		}, error => {
			// 对请求错误做些什么
			return Promise.reject(error)
		})

		// 添加响应拦截器
		instance.interceptors.response.use((res) => {
			let {data} = res
			const is = this.destroy(url)
			if(!is) {
				setTimeout(() => {
					// Spin.hide()
				}, 500)
			}
			if(res.status !== 200) {
				// 后端服务在个别情况下回报201，待确认
				if(res.status === 401) {
					Cookies.remove(TOKEN_KEY)
					window.location.href = window.location.pathname + '#/login'
					Message.error('未登录，或登录失效，请登录')
				} else {
					if(res.msg) Message.error(res.msg)
				}
				return false
			}
			return data
		}, (error) => {
			window.location.href = window.location.pathname + '#/login'
			Message.error('服务器离线')			
			// 对响应错误做点什么
			return Promise.reject(error)
		})
	}
	// 创建实例
	create() {
		let conf = {
			baseURL: localStorage.getItem('serverUrl'),
			// timeout: 2000,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}
		return Axios.create(conf)
	}
	// 合并请求实例
	mergeReqest(instances = []) {
		//
	}
	// 请求实例
	request(options) {
		var instance = this.create()
		this.interceptors(instance, options.url)
		options = Object.assign({}, options)
		this.queue[options.url] = instance
		return instance(options)
	}
}
export default httpRequest


/*
	2. 
*/

import axios from 'axios'
import { getToken } from '@/libs/util'
// import { Spin } from 'iview'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 300000, //设置失效时间
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      let token = getToken()
      if (token) {
        config.headers.Authorization = token
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
