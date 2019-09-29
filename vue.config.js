/* 
  1.在不同的环境配置前缀
  2.打包文件使用，大的打包文件通过cdn直接引入
  3.在chainWebpack里面配置router和其他的别名设置以及配置自定义的loader或者修改默认loader的属性设置，在configureWebpack里面设置打包和插件设置(通常为自定义插件)
  4.自定义的loader引入  
*/

const path = require('path');

const resolve = dir => path.join(__dirname, dir);
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
        publicPath: BASE_URL,
        lintOnSave: process.env.NODE_ENV !== 'production',
        chainWebpack: (config) => {
            config.resolve.alias
                .set('@', resolve('src'))
                .set('_c', resolve('src/components'));
            config.module
                .rule('vue')
                .use('vue-loader')
                .loader('vue-loader')
                .tap(options => {
                    return options
                });
            config.module
                .rule('expose1')
                .test(require.resolve('jquery'))
                .use()
                .loader('expose-loader')
                .options("jQuery")
                .end()
            config.module
                .rule('expose2')
                .test(require.resolve('jquery'))
                .use()
                .loader('expose-loader')
                .options("$")
                .end()
        }
    },
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'jquery': '$',
        },
        plugins: [],
    },
    // 打包时不生成.map文件
    productionSourceMap: false, // 主要是在打包环境中，通过打包文件的错误直接映射的源码中间，但是会增加代码打包的大小
    devServer: {
        port: 8080, // 端口号
        open: true, // 配置自动启动浏览器
        ws: true, // 允许使用webSocket
        // proxy: 'http://localhost:8082',
        /* proxyTable: {
            '/': {
                target: 'http://localhost:8082',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '',
                },
            },
            '/ws/*': {
                target: 'ws://127.0.0.1:8082',
                ws: true,
            },
        }, */
    },
};