// 生成固定style样式
const styles = [
    'position: fixed',
    `z-index: ${zIndex}`,
    `top: ${top}%`,
    `left: ${left}%`,
    `width: ${width}%`,
    `height: ${height}%`,
    'background: ' + (background || '#eee'),
];
const radius = getStyle(node, 'border-radius');
radius && radius != '0px' && styles.push(`border-radius: ${radius}`);
blocks.push(`<div style="${styles.join(';')}"></div>`);

let aa = {
    constructor: function() {
        //构造函数
    },
    startDraw: function() {
        //开始绘画函数
    },
    showBlocks: function() {

    }
}

//evalDom.js主要逻辑
function startDraw() {
    const $this = this;
    const nodes = this.rootNode.childNodes;
    this.beforeRenderDomStyle();

    function childNodesStyleConcat(childNodes) {
        for (let i = 0; i < childNodes.length; i++) {
            const currentChildNode = childNodes[i]; //当前子节点
            //有哪些节点要跳过绘制骨架屏的过程

            if ($this.shouldIgnoreCurrentElement(currentChildNode)) { //是否应该忽略当前节点，不采取任何措施。后续这个地方可以由用户指定哪些节点应该被略去，todo
                continue;
            }

            const backgroundHasurl = analyseIfHadBackground(currentChildNode);
            const hasDirectTextChild = childrenNodesHasText(currentChildNode); //判断当前元素是不是有直接的子元素并且此元素是Text
            if ($this.customizeElement && $this.customizeElement(currentChildNode) !== 0 && $this.customizeElement(currentChildNode) !== undefined) {
                //开发者自定义节点需要渲染的样子，默认返回false表示使用正常递归的算法来处理。如果返回值是true表示不会在向下递归，如果返回值是一个对象那么表示开发需要自定义样式此时直接绘制就好。todo
                if (getArgtype($this.customizeElement(currentChildNode)) === 'object') {
                    console.log('object');
                    //此处如果返回一个对象表示对象要自定义最后绘制的对象
                } else if ($this.customizeElement(currentChildNode) === 1) {
                    //如果此时返回true，表示此节点要过滤
                    getRenderStyle(currentChildNode);
                } else if ($this.customizeElement(currentChildNode) === 2) {
                    continue;
                }
                continue;
            }
            if (backgroundHasurl || analyseIsEmptyElement(currentChildNode) || hasDirectTextChild || shouldDrawCurrentNode(currentChildNode)) { //如果当前元素是内联元素或者当前元素非内联元素，但是不包含子节点或者子节点都是内联元素的话那么我们就在当前的骨架屏上绘制此节点。                  
                getRenderStyle(currentChildNode, hasDirectTextChild);
            } else if (currentChildNode.childNodes && currentChildNode.childNodes.length) { //如果当前节点包含子节点
                //递归
                childNodesStyleConcat(currentChildNode.childNodes);
            }
        }
    }
    childNodesStyleConcat(nodes);
    return this.showBlocks();
}


function showBlocks() {
    //实现将生成的骨架屏直接转换为html代码
}