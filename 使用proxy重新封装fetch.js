let handlers = {
	get(target, property) {
		if(!target.init) {
			['GET', 'POST'].forEach((method) => {
				target[method] = (url, params  = {}) => {
					return fetch(url, {
						headers:  {
							"content-type": "application/json"
						},
						method: 'cors',
						credentials: 'same-origin',
						method,
						...params
					}).then((response) => response.json())
				}
			})
		}
		return target[property]
	}
}

export default handlers 

//使用
let API = new Proxy({}, handlers)

await API.GET('')

await API.POST('', {
	body: JSON.stringify({})
})
