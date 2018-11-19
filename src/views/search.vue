<template>
    <div class="box">
        <div class="searchkuang">
            <span class="iconfont icon-houtui1" @click="changeSearch(false)"></span>
            <input type="text" placeholder="搜索音乐、视频、歌单、歌手、用户" v-model="search"  @focus="showhistory(1)" @blur="showhistory(0)" >
            <span @click="startSearch(search)">搜索</span>
        </div>
        <table v-show="showsearchList">
            <tr v-for="item in searchList">
                <td @click="changeplaying(item)">
                    <span>{{item.singName}}</span><br>
                    <span class="a">{{item.singerName}}--{{item.singZj}}</span>
                </td>
                <td>
                    <span class=" iconfont icon-more-vert" @click="tianjia(item)"></span>
                </td>
            </tr>
        </table>
        <span v-if="showtishi">{{tishi}}</span>
        <div class="history" v-if="showHistory">
            <span>搜索历史</span>
            <ul>
                <li v-for="item in this.$store.state.searchHistory">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:["Search","changeSearch"],
    data () {
        return {
            search:"",
            searchList:"",
            showsearchList:false,
            tishi:"没有查询到此结果",
            showtishi:false,
            showHistory:false,
        }
    },
    methods: {
        // 点击搜索
        startSearch(content){
            this.showHistory = false;
            this.$http.post("/api/query/querySearch?searchName="+ content).then(function(res){
                this.searchList = res.data.list;
                if(this.searchList.length != ""){
                    this.showtishi = false;
                    this.showsearchList = true;
                }else if(this.searchList == ""){
                    this.showtishi = true;
                    this.showsearchList = false;
                }
            });
            // 做历史记录的去重
            this.$store.commit("sethistory",content);
        },
        // 获取焦点后显示搜索历史
        showhistory(zhuangtai){
            if(zhuangtai == 1){
                this.showHistory = true;
                this.showtishi = false;
                this.showsearchList = false;

            }else if(zhuangtai == 0){
                this.showHistory = false;
            }
        },
        // 设置播放
        changeplaying(data){
            this.$store.commit("changePlaying",data)
        },
        tianjia(data){
            console.log("我喜欢")
        }
    }
}
</script>

<style lang="less">
    @import'../assets/less/search.less';
</style>

