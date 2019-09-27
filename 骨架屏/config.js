const dpsConfig = {
    // 默认生成位置为当前项目目录skeleton文件夹，已有骨架屏页面不会再次生成，新页面配置只需要添加新条目即可
    visa_guide: {
        url: 'https://w.mafengwo.cn/sfe-app/visa_guide.html?mdd_id=10083', // 必填项
    },
    call_charge: {
        url: 'http://localhost:8081/sfe-app/call_charge.html?rights_id=25', // 必填项 待生成骨架屏页面的地址，用百度（https://baidu.com）试试也可以
        //url:'https://www.baidu.com',
        device: 'pc', // 非必填，默认mobile
        background: '#eee', // 非必填
        animation: 'opacity 1s linear infinite;', // 非必填
        headless: false, // 非必填
        customizeElement: function(node) { // 非必填
            //返回值枚举如果是true表示不会向下递归到这层为止，如果返回值是一个对象那么节点的档子就按照对象里面的样式来绘制
            //如果返回值为0表示正常递归渲染
            //如果返回值为1表示渲染当前节点不在向下递归
            //如果返回值为2表示对当前节点不作任何处理
            if (node.className === 'navs-bottom-bar') {
                return 2;
            }
            return 0;
        },
        showInitiativeBtn: true, // 非必填 如果此值设置为true表示开发需要主动触发生成骨架屏了，此时headless需设置为false
        writePageStructure: function(html) { // 非必填
            // 自己处理生成的骨架屏
            // fs.writeFileSync(filepath, html);
            // console.log(html)
        },
        init: function() { // 非必填
            // 生成骨架屏之前的操作，比如删除干扰节点
        }
    }
}


module.exports = dpsConfig;