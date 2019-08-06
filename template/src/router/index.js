import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import { routers } from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {

    if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'testing') {
        //添加版本验证，判断是否刷新网页
        var versionScript = document.createElement("script");
        versionScript.src = location.origin + '/dist/version.js?v=' + new Date().getTime();
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(versionScript, s);  
    }

    iView.LoadingBar.start();
    //如果该路由没有名字或者没有子路由则视为 定义以外的路径
    if(!to.name && !to.children) {
        next({
            name: 'error-404'
        })
    } else { 
        next()
    }

});

router.afterEach((to, from, next) => {
    // console.log(roles, to, from);
    // Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
