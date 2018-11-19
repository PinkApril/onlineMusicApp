<template>
    <div class="box">
        <div class="login">
            <span @click="routerGO('*')" class="colse">取消</span>
            <div class="login-wrap">
                <p v-show="showTishi">{{tishi}}</p>
                <input type="text" placeholder="请输入用户名" v-model="username">
                <input type="password" placeholder="请输入密码" v-model="password">
                <button @click="login()">登录</button>
                <span @click="routerGO('/login/register')">没有账号？马上注册</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import {setCookie,getCookie} from "../../assets/cookies.js";
    export default {
        mounted() {
            // 获取cookie  有就进入个人中心页面
            if (getCookie('userName')) {
                if (getCookie('password')) {
                    this.$router.push({
                        path: "/login/gerenzhongxin"
                    })
                }
            }
        },
        data() {
            return {
                showTishi: false,
                tishi: "",
                username: "",
                password: "",
                data: [],
            };
        },
        methods: {
            routerGO(url) {
                this.$router.push({path: url});
            },
            // 验证登录
            login() {
                var yonghu = {
                    userName: this.username,
                    password: this.password
                };
                this.$http.post('http://127.0.0.1:8080/api/login/logining', yonghu, {
                    emulateJSON: true
                }).then(function (res) {
                    if (res.body.status == "0") {
                        // 登录失败提示
                        this.showTishi = true;
                        this.tishi = res.body.msg
                    } else if (res.body.status == "1") {
                        setCookie("userName", this.username, 1);
                        setCookie("password", this.password, 1);
                        // 登录成功
                        this.$store.commit("querendenglu", res.body);
                        this.$router.push({
                            path: "/contentbox/indexmusic"
                        })
                    }
                }, function (err) {
                    console.log("err")
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    @import '../../assets/less/login/login.less';
</style>
