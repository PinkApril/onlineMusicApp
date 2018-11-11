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
.box {
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    .login{
        width: 100%;
        height: 100%;
        background: url("../../../static/image/timg.jpg");
        background-size: 100%;
        .colse {
            display: inline-block;
            padding: 3%;
            margin-top:10%;
            color: #fff;
        }

        .login-wrap {
            height: 100%;
            text-align: center;
            padding-top: 30%;

            input {
                // display: block;
                width: 250px;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                margin-bottom: 10px;
                outline: none;
                border: 1px solid #888;
                padding: 10px;
                box-sizing: border-box;
            }

            p {
                color: red;
            }

            button {
                display: block;
                width: 250px;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                border: none;
                background-color: #41b883;
                color: #fff;
                font-size: 16px;
                margin-bottom: 5px;
            }

            span {
                cursor: pointer;
            }

            span:hover {
                color: #41b883;
            }
        }
    }
}

</style>
