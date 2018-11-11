<template>
    <div>
       <tabs :tabnav="tabnav"></tabs> 
    </div>
</template>
<script>
import tabs from "../../components/indexmusic/tabs.vue";
export default {
    data () {
        return {
            tabnav:"跑步电台"
        }
    },
    components: {
        tabs
    }
}
</script>
<style lang="less" scoped>
div{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: white;
    text-align: center;
    tabs{
        height: 20%;
    }
}
</style>


