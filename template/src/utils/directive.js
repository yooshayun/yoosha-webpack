import Vue from 'vue';
import iview from 'iview'

// 自定义指令
console.log(iview);

//双击图片放大查看
Vue.directive('image-preview', {
    bind: function(el, binding, vnode) {
        // console.log(el, binding, vnode);
        el.addEventListener('dblclick', (e)=>{
            e.stopPropagation();
            console.log('预览图片', el.getAttribute('src'));
            iview.Modal.info({
                render: (h) => {
                    return [
                        h('div',  [
                            h('img', {
                                attrs: {
                                    src: el.getAttribute('src')
                                }
                            })
                        ])
                    ]
                }
            })
        })
    }
})