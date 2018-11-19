<template>
    <div class="box" >
        <comment v-if="comment" :pinglun="pinglun"></comment>
        <!-- 小播放条 -->
        <div v-show="isshowsmall_player" class="small_palyer">
            <div class="playing" v-if="playing.dataState">
                <div @click="changeplayer(playingList[playing.index].id)">
                <audio autoplay="autoplay" :src="'api/'+playingList[playing.index].singURL" @timeupdate="play"
                ></audio>
                    <div class="imgee">
                        <img :src="'api/'+playingList[playing.index].imageURL" alt="">
                    </div>
                    <ul>
                        <li><span>{{playingList[playing.index].singName}}</span></li>
                        <li><span>{{playingList[playing.index].singerName}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="playing" v-else="playing.dataState">
                <h3>当前没有播放歌曲</h3>
            </div>
            <div class="tubiao">
                <span class="iconfont" :class="[playerState == true ? 'icon-pause-20' : 'icon-bofang']" @click="changePlayerState(!playerState)"></span>
                <span class="iconfont icon-zuijinbofang" @click="bofanglist()"></span>
            </div>


        </div>
        <!-- 播放页面 -->
        <div v-if="isshowplayer" class="player" >
            <div class="nav">
                <span class="iconfont icon-houtui1" @click="changeplayer()"></span>
                <span>{{playingList[playing.index].singName}}</span>
                <span class="iconfont icon-more-vert"></span>
            </div>
            <!-- 轮播图 -->
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide>
                    <h3>演唱者：{{playingList[playing.index].singerName}}</h3>
                    <p>这是一些关于《{{playingList[playing.index].singName}}》的简介</p>
                </swiper-slide>
                <swiper-slide>
                    <span>—{{playingList[playing.index].singerName}}—</span><br>
                    <img :src="'api/'+playingList[playing.index].imageURL" alt=""><br>
                    <span>{{playingList[playing.index].singerName}}_{{playingList[playing.index].singName}}</span>
                </swiper-slide>
                <swiper-slide class="geci">
                    <ul>
                        <li v-for="(item,index) in geci" >
                            <span>{{item[1]}}
                                <!-- cur条件 当前播放时间大于当前句的开头时间 并且 当前句的开头时间 < 下一句的开头时间 并且当前时间小于下一句的开头时间 -->
                                <span :style="[
                                    {'animation-duration' : geci[index + 1 > geci.length-1 ? geci.length-1 : index+1][0] - geci[index][0] + 's'},
                                    {'animation-play-state' : playing.playerState ? 'running' : 'paused'}
                                ]"
                                :class="{cur:currentTime > geci[index][0] && currentTime + geci[index][0] - geci[index <= 0 ? 0 : index +1 > geci.length-1 ? geci.length-1 : index+1][0]}"
                                >{{item[1]}}
                                </span>
                            </span>
                        </li>
                    </ul>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            <div class="btn">
                <div class="progressbar">
                    <span class="start">{{currentTime | zhuanhuan}}</span>
                    <span class="duration" @click="gocurrentTime($event)">
                        <span class="currentTime" :style="{width:currentTime / duration * 100 + '%'}"></span>
                    </span>
                    <span class="end">{{duration | zhuanhuan}}</span>
                </div>
                <div>
                    <span :class=this.mode @click="setmode()"></span>
                    <span class="iconfont icon-previous" @click="qiege(0)"></span>
                    <span class="iconfont" :class="[playerState == true ? 'icon-pause-20' : 'icon-bofang']" @click="changePlayerState(!playerState)"></span>
                    <span class="iconfont icon-next" @click="qiege(1)"></span>
                    <span class="iconfont icon-zuijinbofang" @click="bofanglist()"></span>
                </div>
                <div>
                    <span class="iconfont icon-xin1" :class="{'cur':playing.Ilike}" @click="changelike(playingList[playing.index])"></span>
                    <span class="iconfont icon-icon--"></span>
                    <span class="iconfont icon-fenxiang1"></span>
                    <span class="iconfont icon-BAI-pinglun" @click="pinglun()"></span>
                </div>
            </div>  
        </div>
        <div v-if="isshowplayer" class="bg" :style="{background:`url(api/${playingList[playing.index].imageURL}) 0 0 / 100% 100% no-repeat`}"></div>
        <div v-if="isshowplayer" class="bg2" :style="{background:`url(api/${playingList[playing.index].imageURL}) 0 0 / 100% 100% no-repeat`}"></div>
        <!-- 播放列表 -->
        <div class="bofanglist_box" v-show="isshowbofanglist">
            <div class="bofanglist">
                <div class="nav">
                    <span :class="this.mode" @click="setmode()"></span>
                    <span>{{this.mode_c}}</span>
                    <span>(共{{playingList.length}}首)</span>
                    <span class="iconfont icon-lajixiang" @click="delbofangall()"></span>
                </div>
                <ul>
                    <li></li>
                    <li v-for="(item,index) in playingList" >
                        <span :class="{cur: item == playingList[playing.index]}" @click="changeplaying(item)">{{item.singName}}</span>
                        <span class="iconfont icon-lajixiang" @click="delbofangsing(item,index)"></span>
                    </li>
                </ul>
            </div>
            <div class="bofanglist_bg" @click="bofanglist()"></div>
            <span class="close" @click="bofanglist()">关闭</span>
        </div>
    </div>
</template>
<script>
import comment from "./../components/player/comment";
export default {
    data() {
        return {
            // 播放器和播放页面的切换状态
            isshowsmall_player: true,
            isshowplayer: false,
            // 轮播图设置
            swiperOption: {
                pagination: {
                    el: ".swiper-pagination"
                }
            },
            //歌曲循环模式
            mode: "iconfont icon-shunxubofang",
            mode_c: "循序播放",
            // 歌曲总时长
            duration: "",
            // 歌曲当前播放时长
            currentTime: "",
            // 歌曲歌词
            geci: [],
            // 是否显示播放列表 默认不显示
            isshowbofanglist:false,
            // comment状态
            comment:false,
        };
    },
    filters: {
        zhuanhuan(s){
            var t;
            if(s > -1){
                var min = Math.floor(s / 60) % 60;
                var sec = s % 60;
                if(min < 10){t = min + "0"}
                t = min + ':';
                if(sec < 10){t += "0"}
                t += parseInt(sec)
            }
            return t
        }
    },
    // 事件方法
    methods: {
        // 打开评论页
        pinglun(){
            this.comment = !this.comment;
        },
        // 播放器和播放页面的切换及获取处理歌词
        changeplayer(data) {
            this.isshowplayer = !this.isshowplayer;
            this.isshowsmall_player = !this.isshowsmall_player;
            if (this.isshowplayer == true) {
                var arr = [];
                // 歌词的全部 包括时间 歌词 歌词介绍
                var all = this.getgeci.split(/\n/);
                // 匹配时间的正则表达式
                var timeregexp = /\d{2}:\d{2}.\d{2}/g;
                // 用wilie循环过滤不需显示的内容
                while (!timeregexp.test(all[0])) {
                    all = all.splice(1);
                }
                // 得到时间和纯歌词
                all.forEach(element => {
                    var index = element.indexOf("]");
                    // 得到时间
                    var time = element.substr(1, index - 1);
                    time = time.split(":");
                    time = time[0] * 60 + parseFloat(time[1]);
                    // 得到纯歌词
                    var chungeci = element.substr(index + 1);
                    // 返回处理过多的时间+春歌词的二维数组
                    arr.push([time, chungeci]);
                    return arr;
                });
                this.geci = arr;
            }
        },
        bofanglist(){
            if(this.playingList.length == 0){
                return
            }else{
                this.isshowbofanglist = !this.isshowbofanglist
            }
        },
        // 切歌
        qiege(status) {
            this.$store.commit("QIEGE", status);
        },
        // 切换播放模式
        setmode() {
            if (this.mode == "iconfont icon-xunhuan") {
                this.mode = "iconfont icon-singlecycle";
                this.mode_c = "单曲循环";
            } else if (this.mode == "iconfont icon-singlecycle") {
                this.mode = "iconfont icon-shunxubofang";
                this.mode_c = "顺序播放";
            } else if (this.mode == "iconfont icon-shunxubofang") {
                this.mode = "iconfont icon-bofangye-caozuolan-suijibofang";
                this.mode_c = "随机播放";
            } else if (this.mode == "iconfont icon-bofangye-caozuolan-suijibofang") {
                this.mode = "iconfont icon-xunhuan";
                this.mode_c = "列表循环";
            }
        },
        // 点击 暂停/播放音乐
        changePlayerState(status) {
            if (this.dataState == true) {
                this.$store.commit("changePlayerState", status);
                if (this.playerState == true) {
                    $("audio")[0].play();
                } else {
                    $("audio")[0].pause();
                }
            }
        },
        // 播放
        play() {
            // 更新播放条的时间
            if(this.$store.state.setplaying.dataState == false){
                return
            }
            this.duration = $("audio")[0].duration;
            this.currentTime = $("audio")[0].currentTime;
            for (let index = 0; index < this.geci.length-1; index++) {
                if(this.currentTime > this.geci[index][0]){
                    $("ul").css({
                        "top": $(".geci").height() / 2+26 - 26*(index+1)
                    })
                }     
            }
            // 单曲循环
            if(this.mode == "iconfont icon-singlecycle"){
                $('audio')[0].loop = true    
            }
            // 列表循环、 顺序播放、随机
            if ($("audio")[0].ended) {
                if(this.mode == "iconfont icon-xunhuan"){
                    if(this.playing.index == this.playingList.length-1){
                        this.$store.commit("changeIndex","xunhuan")
                    }else{
                        this.$store.commit("QIEGE",1)
                    }
                }else if(this.mode == "iconfont icon-shunxubofang"){
                    if(this.playing.index != this.playingList.length-1){
                        this.$store.commit("QIEGE",1)
                    }else if(this.playing.index == this.playingList.length-1){                         
                        this.$store.commit("changePlayerState", false);
                    }
                }else if(this.mode == "iconfont icon-bofangye-caozuolan-suijibofang"){

                }
            }
        },
        // 添加我喜欢
        changelike(data) {
            this.$store.dispatch("LIKE",data)
        },
        // 跳转音乐进度
        gocurrentTime(e) {
            // 鼠标的位置/总进度的宽度*总时长=跳跃时间
            $("audio")[0].currentTime = (e.offsetX / $(".duration").width()) * $("audio")[0].duration;
        },
        // 点击歌曲换歌
        changeplaying(data){
            this.$store.commit("changePlaying",data)
        },
        // 从播放列表中删除选中歌曲
        delbofangsing(item,index){
            this.$store.commit("DELbofangsing",[item,index])
            // 当播放列表没有数据时，播放页面的数据归零
            if(this.$store.state.setplaying.dataState == false){
                // 播放器和播放页面的切换状态
                this.isshowsmall_player = true;
                this.isshowplayer = false;
                // 歌曲总时长
                this.duration = "";
                // 歌曲当前播放时长
                this.currentTime = "";
                // 歌曲歌词
                this.geci= [];
                // 是否显示播放列表 默认不显示
                this.isshowbofanglist = false
            }
        },
        // 清空播放列表
        delbofangall(){
            this.$store.commit("DELbofangALL")
            // 播放器和播放页面的切换状态
            this.isshowsmall_player = true;
            this.isshowplayer = false;
            // 歌曲总时长
            this.duration = "";
            // 歌曲当前播放时长
            this.currentTime = "";
            // 歌曲歌词
            this.geci= [];
            // 是否显示播放列表 默认不显示
            this.isshowbofanglist = false
        }
    },
    // 计算属性 （简化插值）
    computed: {
        playing() {
            return this.$store.state.setplaying;
        },
        playingList() {
            return this.$store.state.setplaying.playingList;
        },
        dataState() {
            return this.$store.state.setplaying.dataState;
        },
        playerState() {
            return this.$store.state.setplaying.playerState;
        },
        LikeSong() {
            return this.$store.state.like.songList;
        },
        // 获取歌词
        getgeci() {
            return this.playingList[this.playing.index].singCi;
        }
    },
    components: {
        comment
    }
};
</script>

<style lang="less" scoped>
    @import '../assets/less/player/player.less';
</style>
