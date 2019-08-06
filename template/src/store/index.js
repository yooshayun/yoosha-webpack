import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

import user from './modules/user';
import getters from './getters';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //页面筛选条件缓存
        listPagePars: new Map(),

        lang: Cookies.get('lang') || navigator.language
    },
    mutations: {
        //
        SAVE_LIST_PAGE_PARS: (state, { path, pars }) => {
            state.listPagePars.set(path, pars);
        },
        
        CHANGE_LANG:(state, lang)=>{
            state.lang = lang;
            Cookies.set('lang', lang);
        }
    },
    actions: {
        saveListPagePars: ({ commit }, { path, pars }) => {
            commit('SAVE_LIST_PAGE_PARS', { path, pars });
        },

        changeLang({commit, dispatch}, lang){
            commit('CHANGE_LANG', lang);
            // 退出登录
        }
    },
    modules: {
        user
    },
    getters
});

export default store;
