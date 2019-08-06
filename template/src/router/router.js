// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/hello',
        title: 'hello',  // 首页
        name: 'hello',
        role: 'home',
        component: (resolve) =>
            require (['@/views/hello.vue'], resolve)
        
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    ...appRouter
];
