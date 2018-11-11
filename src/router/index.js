import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

import contentbox from "../views/publicHeader.vue"

import indexmusic from "../views/indexmusic/index.vue"
import like from "../views/indexmusic/like.vue"
import buymusic from "../views/indexmusic/buymusic.vue"
import runningradio from "../views/indexmusic/runningradio.vue"

import yinyueguan from "../views/yinyueguan/index.vue"
import faxian from "../views/faxian/index.vue"

import login from "../views/login/login.vue"
import gerenzhongxin from "../views/login/gerenzhongxin.vue"
import register from "../views/login/register.vue"

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/contentbox',
            name: '内容头',
            component: contentbox,

            children: [{
                path: 'indexmusic',
                name: '我的',
                component: indexmusic,

                children: [
                    {
                        path: "like",
                        name: "我喜欢",
                        meta: {
                            requireAuth: true
                        },
                        component: like
                    }, {
                        path: "buymusic",
                        name: "已购音乐",
                        meta: {
                            requireAuth: true
                        },
                        component: buymusic
                    }, {
                        path: "runningradio",
                        meta: {
                            requireAuth: true
                        },
                        name: "跑步电台",
                        component: runningradio
                    }
                ],
            }, {
                path: 'yinyueguan',
                name: '音乐馆',
                component: yinyueguan
            }, {
                path: 'faxian',
                name: '发现',
                component: faxian
            }]
        },
        {
            path: '/login',
            name: '发现',
            component: login,
            children:[{
                path: 'gerenzhongxin',
                meta: {
                    requireAuth: true
                },
                name: '个人中心',
                component: gerenzhongxin, 
            },{
                path: 'register',
                name: '注册页',
                component: register,  
            }]
        },
         {
            path: "*",
            redirect: "./contentbox/indexmusic"
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.state.login == 1) { // 通过vuex state获取当前的登录状态
            next();
        } else {
            next({
                path: '/login',
                // query: {
                //     redirect: to.fullPath
                // } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
        console.log("需要登录")
    } else {
        next();
    }
});
export default router
