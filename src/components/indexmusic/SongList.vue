<template>
    <div>
        <table>
            <tr v-for="item in this.$store.state.like.songList" >
                <td @click="changeplaying(item)">
                    <span>{{item.singName}}</span><br>
                    <span class="singeralbum">{{item.singZj}}</span>
                </td>
                <td>
                    <span class=" iconfont icon-more-vert"></span>
                </td>
            </tr>
        </table>

    </div>
</template>
<script>
export default {
    data () {
        return {
            songlist :null
        }
    },
    methods: {
        changeplaying(data){
            this.$store.commit("changePlaying",data)
        }
    }
}
</script>
<style lang="less" scoped>
div{
    width: 100%;
    height: 100%;
    overflow: scroll;
    text-align:center;
    table{
        width: 100%;
        border-collapse: collapse;
        tr{
            border-bottom:1px solid silver;
            td{
            height: 20%;
                padding: 2% 3%;
                text-align: left;
                .singeralbum{
                    font-size: 16px;
                    color: silver
                }
            }
            td:last-child{
                width: 20%;
                text-align: center
            }
        }
    }
}
</style>

