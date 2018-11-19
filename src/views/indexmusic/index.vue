<template>
    <div>
        <div class="header_box">
            <div class="header">
                <div>
                    <span>头像</span>
                    <span class="username" @click="loginGO(['/login','/login/user'])">{{this.$store.state.nikeName}}</span>
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
    @import url('../../assets/less/indexmusic/index.less');
</style>
