<template>
    <div id="app">
        <router-view></router-view>
        <bofangqi></bofangqi>
    </div>
</template>

<script>
import bofangqi from "../src/views/player";
    export default {
        name: 'App',
        created() {
            this.$store.dispatch("init")
        },
        components: {
            bofangqi
        }
    }

</script>

<style lang="less" scoped>
    .app {
        width: 100%;
        height: 100%;
        position: relative;
    }

</style>
