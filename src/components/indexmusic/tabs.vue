<template>
    <div>
        <span class="iconfont icon-houtui1" @click="routeGO('indexmusic')"></span>
        <span>{{tabnav}}</span>
        <span class="iconfont icon-more-vert"></span>
    </div>
</template>
<script>
export default {
    props: ["tabnav"],
    methods: {
        routeGO(url){
            this.$router.push({path:url})
        }
    }
}
</script>
<style lang="less" scoped>
div{
    width: 100%;
    .iconfont{
        font-size: 20px;
    }
    span{
        display: inline-block;
        width: 30%;
        line-height: 40px;
    }
    span:first-child{
        text-align: left;
    }
    span:nth-child(2){
        text-align: center
    }
    span:last-child{
        text-align: right;
    }
}

</style>

