import axios from 'axios';
import md5 from 'md5';
import { getToken } from '@/utils/token';
import Config from '../../config/app.config';
import { Message } from 'iview';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import urlParse from 'url-parse';
import { ReadStream } from 'tty';


Vue.use(VueRouter);

const fetch = axios.create({
    baseURL: Config.http_url,
    headers: {
        'X-UUID': Config.uuid,
        'X-VERSION': Config.version,
        'X-PLATFORM': Config.platform
    }
});

// 添加请求拦截器
fetch.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    let time = Date.now();
    let url;
    // console.log(config, config.url);
    // debugger;
    // console.log(urlParse(config.baseURL, true));
    let urlConfig = urlParse(config.baseURL, true);
    if (config.params) {
        for (let key in config.params) {
            //对一些空字段进行过滤，但不包括0
            if (config.params[key] === '' || config.params[key] === null || config.params[key] === undefined || String(config.params[key]) === 'NaN') {
                delete config.params[key];
            }
        }
        let params = '';
        for (let key in config.params) {
            if (key) {
                params = params + `${key}=${config.params[key]}&`;
            }
        }
        url = `${urlConfig.pathname + config.url}${params.slice(0, params.length - 1)}`;
    } else {
        url = urlConfig.pathname + config.url;
    }
    if (config.data) {
        for (let key in config.data) {
            if (config.data[key] === '' || config.data[key] === undefined || String(config.data[key]) === 'NaN') {
                delete config.data[key];
            }
        }
    }
    time = Math.floor(time/1000);
    config.headers['X-TS'] = time;
    config.headers['X-ACCESS-TOKEN'] = getToken() || '';
    // config.headers['X-DEBUG'] = false;
    // console.log(Config.appkey, url, time);
    config.headers['X-SIGN'] = md5(`${Config.appkey}${url}${time}`);
    // console.log(`${Config.appkey}${url}${time}`);
    config.headers['X-LANGUAGE'] = Cookies.get('lang') == 'zh' ? 'zh-cn' : 'en-us';

    // console.log(`${url}`)
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//控制消息条数
let response = {
    notPermission: 0
};

// 添加响应拦截器
fetch.interceptors.response.use((res) => {
    // 对响应数据做点什么
    // if (res.data.code === 601) {
    //     Message.error({
    //         content: res.data.message,
    //         duration: 3
    //     });
    //     return res;
    // }
    // Vue.$t('message.hint.loginOutLater');
    // console.log(Vue.$t('message.hint.loginOutLater'));
    if (res.data.code >= 410 && res.data.code < 500) {
        if(response.notPermission == 0) {
            response.notPermission = 1;
            let default_lang = Cookies.get('lang');
            let words = (default_lang === 'zh') ? '3秒后自动关闭' : ', will automatically quit after 3 seconds'
            Message.error({
                content: `${res.data.message},${words}`,
                duration: 3
            });
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('password');
            setTimeout(() => {
                location.href = "/#/login";
                response.notPermission = 0;
            }, 3000);
        }
        return Promise.reject(res);
    }
    else if(res.data.code > 304 && res.data.code < 410){
        Message.error(res.data.message);
    } 
    else if(res.data.code >= 500) {
        Message.error(res.data.message);
    } 
    
    return res;
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default fetch;