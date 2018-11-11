<template>
    <div>
        
        <div class="head">
            <span class="iconfont icon-houtui1" @click="routerGO('*')"></span>
            <span class="user">这是【{{this.$store.state.nikeName}}】的个人中心哦~</span>
            <ul>
                <li v-for="item in usertab">
                    <span>{{item.num}}</span><br>
                    <span>{{item.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            usertab:[
                {title:"关注",num:0},
                {title:"粉丝",num:52},
                {title:"好友",num:300},
                {title:"访客",num:18},
            ]
        }
    },
    methods: {
        routerGO(url) {
            this.$router.push({path: url});
        },
}
}
</script>

<style lang="less" scoped>
div{
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    .head{
        width: 100%;
        height: 40%;
        background-image: url("../../../static/image/bg.jpg");
        background-size:cover;
        .iconfont{
            font-size:20px;
            padding: 5%;
            line-height: 40px;
            color: #fff;
        }
        .user{
            text-align:center;
            display: block;
            padding: 18% 0;
            color: #fff;
        }
        ul{
            width: 100%;
            height: 10%;
            li{
                float: left;
                width: 25%;
                text-align:center;
                color: #fff;
                border-right: 1px solid #fff;
            }
            li:last-child{
                border: none;
            }
        }
    }
}
</style>
