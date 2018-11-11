<template>
    <div class="box">
        <div class="shezhiye_box" v-if="shezhiye" @click="shezhi(false)">
            <div class="shezhiye" >
                这里是设置页面<br>
                <span @click="tuichu()">退出登录</span>
            </div>
        </div>
        <!-- 搜索页 -->
        <search v-if="Search" :Search="Search" :changeSearch="changeSearch"></search>

        <header>
            <ul>
                <li class="iconfont icon-caidan caidan" @click="shezhi(true)"></li>
                <li v-for="item in tabNav" :class="{cur:$route.name == item.title}" @click="routerGo(item.url)" >{{item.title}}</li>
                <li class="iconfont icon-more-vert gengduo"></li>
            </ul>
        <span @click="changeSearch(true)">搜索</span>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
    import search from "./search.vue";
    import { setCookie, getCookie, delCookie } from "../assets/cookies.js";
    export default {
        data() {
            return {
                tabNav: [
                    { title: "我的", url: "indexmusic" },
                    { title: "音乐馆", url: "yinyueguan" },
                    { title: "发现", url: "faxian" }
                ],
                // 设置页状态
                shezhiye: false,
                // 搜索也状态
                Search: false,
                setdome:["个人装扮"]
            };
        },
        methods: {
            // 分类页跳转
            routerGo(url) {
                this.$router.push({ path: url });
            },
            // 设置页出现
            shezhi(zhuangdai) {
                this.shezhiye = zhuangdai;
            },
            // 改变搜索页的状态
            changeSearch(status) {
                this.Search = status;
            },
            // 退出登录
            tuichu() {
                this.$store.commit("restore");
                delCookie("userName");
                delCookie("password");
            }
        },
        components: {
            search
        }
    };
    </script>

<style lang="less" scoped>
.box {
    .shezhiye_box {
        z-index: 2;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        .shezhiye {
            position: relative;
            width: 80%;
            height: 100%;
            background: white;
            span{
                position: absolute;
                bottom: 0;
                width: 100%;
                border-top: 1px solid silver;
                padding: 3%;
                text-align:right;
                line-height: 40px;
            }
        }
    }
    header {
        display: inline-block;
        width: 100%;
        background: rgb(22, 202, 22);
        color: #fff;
        text-align: center;
        ul {
            width: 100%;
            font-size: 20px;
            text-align: center;
            line-height: 200%;
            li {
                width: 20%;
                float: left;
            }
            li:first-child {
                font-size: 20px;
                text-align: left;
                padding-left: 5%;
            }
            li:last-child {
                font-size: 20px;
                text-align: right;
                padding-right: 5%;
            }
        }
        span {
            display: inline-block;
            width: 95%;
            margin-bottom: 3%;
            padding: 1% 0;
            background: rgb(3, 182, 77);
        }
    }
}
    .cur {
        font-weight: bold;
    }
</style>

