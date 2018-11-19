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
    @import '../../assets/less/login/user.less';
</style>
