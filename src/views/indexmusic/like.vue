<template>
    <div class="box">
        <tabs :tabnav="tabnav"></tabs> 
        <header>
            <ul>
                <li v-for="item in navs" @click="qiehuan(item.type)" :class="{cur:item.type == xianshinavs}">{{item.title}}{{item.num}}</li>
            </ul>
        </header>
        <body>
            <SongList v-show="xianshinavs=='SongList'"></SongList>
            <AlbumList v-show="xianshinavs=='AlbumList'"></AlbumList>
            <playlist v-show="xianshinavs=='playlist'"></playlist>
            <RadioList v-show="xianshinavs=='RadioList'"></RadioList>
            <MVList v-show="xianshinavs=='MVList'"></MVList>
        </body>
    </div>
</template>
<script>
import tabs from "../../components/indexmusic/tabs.vue";
import SongList from "../../components/indexmusic/SongList.vue";
import AlbumList from "../../components/indexmusic/AlbumList.vue";
import playlist from "../../components/indexmusic/playlist.vue";
import RadioList from "../../components/indexmusic/RadioList.vue";
import MVList from "../../components/indexmusic/MVList.vue";
export default {
    data () {
        return {
            // 详情页标题
            tabnav:"我喜欢", 
            // 小导航栏内容
            navs:[
                { title:"单曲",num:"",type:"SongList"},
                { title:"专辑",num:"",type:"AlbumList"},
                { title:"歌单",num:"",type:"playlist"},
                { title:"电台",num:"",type:"RadioList"},
                { title:"视频",num:"",type:"MVList"},
            ],
            // 默认显示
            xianshinavs:"SongList",
            
        }
    },
    methods: {
        qiehuan(a){
            this.xianshinavs = a
        }
    },
    components: {
        tabs,
        SongList,
        AlbumList,
        playlist,
        RadioList,
        MVList
    }
}
</script>
<style lang="less" scoped>
    @import '../../assets/less/indexmusic/like.less';
</style>


