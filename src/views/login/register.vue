<template>
    <div class="box">
        <span @click="routerGO()">取消</span>
        <input type="userName" placeholder="账号" v-model="userName">
        <input type="password" placeholder="密码" v-model="password">
        <button @click="tijiao()" >提交</button>
    </div>
</template>
<script>
import {setCookie,getCookie} from "../../assets/cookies.js";
export default {
    data () {
        return {
            userName:"",
            password:"",
        }
    },methods: {
        routerGO(){
            this.$router.push({path:'*'})
        },
        tijiao(){
            if(this.password == "" || this.userName ==""){
                console.log("账号或密码不能为空")
            }else if(this.userName != "" && this.password != ""){
                var zhuce = {userName:this.userName,password:this.password}
                this.$http.post("http://127.0.0.1:8080/api/login/register",zhuce,{emulateJSON:true}).then((res) => {
                if(res.body.status == "0"){
                    // 登录失败提示
                    this.showTishi = true;
                    this.tishi = res.body.msg
                    }else if(res.body.status == "1"){
                        setCookie("userName",this.username,1);
                        setCookie("password",this.password,1);
                        // 登录成功
                        this.$store.commit("querendenglu", res.body );
                        this.$router.push({path:"/contentbox/indexmusic"})
                    }
                    },function(err){
                    console.log("err")
                    }
                );
            }
        }
    }
}
</script>

<style lang="less" scoped>
.box{
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../../../static/image/aaa.jpg") no-repeat;
    background-size: 120%;
    text-align: center;
    span{
        text-align:left;
        display: block;
        margin-bottom: 50%;
        padding: 3%;
    }
    input{
        width: 70%;
        padding: 3% 0;
        margin: 1%;
    }
    button{
        width: 70%;
        padding: 3% 0;
        margin: 3%;
        background: rgb(5, 190, 61);
    }
}
</style>

