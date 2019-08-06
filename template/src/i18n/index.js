import VueI18n from 'vue-i18n'
import Vue from 'vue'
import iView from 'iview';
import zh from './lang/zh-cn'
import en from './lang/en-us'
import en1 from 'iview/dist/locale/en-US';
import zh1 from 'iview/dist/locale/zh-CN';

Vue.use(VueI18n);

const messages = {
  en: Object.assign({}, en, en1),
  zh: Object.assign({}, zh, zh1)
}

//多语言设置
const i18n = new VueI18n({
  locale: 'zh',    // 语言标识默认为中文
  messages
});
Vue.use(iView, {
  i18n: (key,value) => {
    return i18n.t(key,value)
  }
});


export default i18n
