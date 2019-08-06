import Vue from 'vue';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import i18n from './i18n';
import moment from 'moment';
import Cookies from 'js-cookie';
import { detectZoom } from './utils/detectZoom'
import './styles/common.less';
import './styles/my-theme/my-theme.less';
import '@/utils/directive'


//关于每次部署后客户端自动更新问题
window.getVersion = (version) => {
    if((sessionStorage.frontendVersion && version !== sessionStorage.frontendVersion) || (window.frontendVersion && version !== window.frontendVersion)) {
        // Loading.service(); // 启动全屏loading
        location.reload(); // 刷新页面
    }

    sessionStorage.frontendVersion = version; // 保存 以便下次使用判断
    window.frontendVersion = version; // 保存 以便下次使用判断
}

Vue.prototype.$moment = moment;
Vue.use(echarts);


//全局提示配置 滞留时间改为3s
Vue.prototype.$Message.config({
    top: 50,
    duration: 3
});

function changeLange() {
    //默认
    const default_lang = Cookies.get('lang') || navigator.language;
    // console.log(default_lang, 'default_lang');
    Cookies.set('lang', default_lang);
    if (default_lang === 'zh-CN' || default_lang === 'zh-cn' || default_lang === 'zh') {
      i18n.locale = 'zh'
    } else {
      i18n.locale = 'en'
    }
    // 初始化系统语言类型
    Vue.config.lang = i18n.locale;
    store.commit('CHANGE_LANG', i18n.locale);
    // console.log(store.state);
}
changeLange()

let vm = new Vue({
    el: '#app',
    router: router,
    i18n,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    computed: {
        lang() {
            return this.$store.state.lang;
        }
    },
    watch: {
        lang: function(){
            changeLange();
            // this.$store.dispatch('DictionaryAll').then().catch();
        }
    },
    mounted() {        
        // iview-admin检查更新
		// util.checkUpdate(this);
		window.addEventListener('resize', ()=>{
			let size = detectZoom();
			if(size < 99 || size > 101) {
				console.log('当前浏览器或者屏幕缩放比为：' + size + '%, 可能造成页面排版变化，请调回100%');
			}
		})
    },
    created() {
        
    }
});
