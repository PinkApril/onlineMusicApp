<template>
    <div class="box">
        <div class="header">
            <span class="iconfont icon-houtui1" @click="pinglun"></span>
            <span>评论</span>
        </div>
        <div class="body">
            <div class="sing">
                <img src="" alt="">
                <span>歌名</span>
                <span>歌手</span>
            </div>
            <div class="comment">
                <div>
                    <span>用户</span>
                    <span>时间</span>
                    <p>评论内容</p>
                </div>
            </div>
            <div class="footer">
                <form action="" method="get">
                    <input type="textarea" name="" id="">
                    <input type="submit" value="提交">
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['pinglun']
}
</script>
<style lang="less">
    @import '../../assets/less/player/comment.less';
</style>