

 创建项目模板使用`vue-cli`:

``` bash
vue init yooshayun/yoosha-webpack my-project

```
### 启动提示
```
    npm run env:dev
    npm run env:qa
    npm run env:prod               //调试环境切换
    npm run build:dev
    npm run build:qa
    npm run build:prod             //打包环境切换
```

---
### 模板内容提示
1. api  
   +. fetch 对axios的基本封装 处理一些前后端协议header以及返回的错误信息
   +. socket 

2. components 放置一些公共的组件

3. filters 放置filters过滤器

4. i18n 多语言文件， 现只是设置了中英文

5. router 路由文件
    +. index 路由拦截器设置 
    +. router 路由单元

6. store vuex
    +. index  listPagePars对各个路由下的信息进行缓存，比如查询条件等 
    +. getters 对一些需要缓存的全局信息进行获取，比如全局的国家码
    +. /modules 其它功能用途的vuex文件

7. styles 全局样式控制文件
    +. base 全局的设计标准定义
    +. common 公共样式
    +. iview-cover iview组件修改样式

8. template/index.ejs 文件build时的打包模板

9. utils 工具文件
    +. detectZoom 检查当前浏览器是否缩放状态
    +. directive 自定义指令文件
    +. export 导出

10. vendors 打包文件的提取的公用资源包（控制哪些资源会被打包到一起）

11. views vue页面文件


