<template>
    <div>
        <div class="header_box">
            <div class="header">
                <div @click="loginGO(['/login','/login/gerenzhongxin'])">
                    <span>头像</span>
                    <span class="username">{{this.$store.state.nikeName}}</span>
                </div>
                <ul>
                    <li>
                        <span>活动中心</span><br>
                        <i>完成听歌任务领奖励</i>
                    </li>
                    <li>
                        <span>会员中心</span><br>
                        <i>限时领2个月豪华绿钻</i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="body_box">
            <ul class="body_top">
                <li><span class="iconfont icon-music"></span><br>本地音乐<br><i>28</i></li>
                <li><span class="iconfont icon-icon--"></span><br>下载音乐<br><i>9</i></li>
                <li><span class="iconfont icon-zuijinbofang"></span><br>最近播放<br><i>200</i></li>
                <li @click="routerGO('indexmusic/like')"><span class="iconfont icon-xin1"></span><br>我喜欢<br><i>{{this.$store.state.likeLength}}</i></li>
                <li @click="routerGO('indexmusic/buymusic')"><span class="iconfont icon-yuleyinleshoucang"></span><br>已购音乐<br><i></i></li>
                <li @click="routerGO('indexmusic/runningradio')"><span class="iconfont icon-diantai"></span><br>跑步电台<br><i></i></li>
            </ul>

            <div class="gedan">
                <div class="gedan_top">
                    <span>自建歌单</span>
                    <span>|</span>
                    <span>收藏歌单</span>
                </div>
                <ul class="gedan_bottom">
                    <li>
                        <table>
                            <tr>
                                <td><span>0个歌单</span></td>
                                <td><span class="iconfont icon-addfile"></span><span class="iconfont icon-icon8"></span></td>
                            </tr>
                        </table>
                    </li>
                    <li></li>
                    <li>
                        <span>+新建歌单</span>
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import {setCookie,getCookie} from "../../assets/cookies.js";
    export default {
        // 创建前
        mounted() {
            // 获取cookie  用cookie拉取数据
            if (getCookie('userName')) {
                if (getCookie('password')) {
                    var yonghu = {
                        userName: getCookie('userName'),
                        password: getCookie('password')
                    }
                    this.$store.dispatch("LOGIN",yonghu)
                }
            }
        },
        methods: {
            // 跳转登录页面和个人中心
            loginGO(url) {
                if (this.$store.state.login == 0) {
                    this.$router.push({
                        path: url[0]
                    });
                } else if (this.$store.state.login == 1) {
                    this.$router.push({
                        path: url[1]
                    })
                }
            },
            // 跳转详情页
            routerGO(url) {
                this.$router.push({
                    path: url
                });
            }

        }
    };

</script>

<style lang="less" scoped>
    * {
        font-size: 16px;
    }

    .header_box {
        width: 100%;

        .header {
            width: 95%;
            border: 1px solid silver;
            margin: 0 auto;
            div {
                text-align: center;
                font-size: 20px;
                line-height: 40px;

                .username {
                    font-size: 20px;
                    font: bold;
                }
            }

            ul {
                overflow: hidden;
                text-align: center;

                li {
                    width: 50%;
                    float: left;
                    padding: 3%;

                    i {
                        font-size: 13px;
                    }
                }

                li:first-child {
                    border-right: 1px solid rgb(22, 202, 22);
                }
            }
        }
    }

    .body_box {
        .body_top {
            width: 100%;
            text-align: center;

            li {
                width: 33.33%;
                float: left;
                padding: 3% 0;

                span {
                    font-size: 50px;
                    color: rgb(11, 206, 11);
                }
            }

            li:last-child {
                padding-bottom: 10%;
            }
        }

        .gedan {
            .gedan_top {
                text-align: center;
            }

            .gedan_bottom {
                width: 100%;

                li {
                    width: 100%;
                    margin-bottom: 3%;

                    table {
                        width: 100%;

                        tr {
                            td {
                                width: 50%;
                            }

                            td:last-child {
                                text-align: right;

                                span {
                                    font-size: 20px;
                                    padding: 0 5%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>
