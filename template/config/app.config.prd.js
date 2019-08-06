import uuid from 'uuid/v1';

export default {
  http_url: 'https://store-api.kolo.la',
  http_url_axios: 'https://api.kolo.la',
  socket_url: 'wss://store-api.qa.ikolo.me',
  uuid: uuid(), // 设备唯一标识符
  version: '1.4.5',
  lang: 'zh-cn',
  appkey: 'kolo.store.signkey',
  platform: 'store'
}
