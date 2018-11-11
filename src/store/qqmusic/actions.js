import axios from 'axios'
var qs = require('qs');
export default{
    // 发出异步请求登录账号的信息
    async init({commit,state}){
        if(state.id !== null){
            const id = state.id;
            const data = await fetch("/api/login/test?id="+id).then(data=>data.json())
            commit("querendenglu",data)
        }
    },
    // 登陆
    LOGIN({commit,state},data){
        axios.post('http://127.0.0.1:8080/api/login/logining', qs.stringify(data),).then(function (res) {
            if (res.data.status == "1") {
                commit("querendenglu", res.data);
            }
        }, function (err) {
            console.log("err")
        })
    },
    // 添加删除我喜欢的歌曲
    LIKE({commit,state},data){
        if (state.login == 1) {    
            var del = {
                uid: state.id,
                singId: data.id
            };
            if (state.setplaying.Ilike == false) {
                axios.post("http://127.0.0.1:8080/api/query/addMyLoveSing", qs.stringify(del)).then(result => {
                    commit("ChangeLIKESong", [result.data.songList,true]);
                }).catch(err => {
                    console.log("添加出错啦");
                });
            } else if (state.setplaying.Ilike == true) {
                axios.post("http://127.0.0.1:8080/api/query/deleteMyLoveSing", qs.stringify(del)).then(result => {
                    commit("ChangeLIKESong", [result.data.songList,false]);
                }).catch(err => {
                    console.log("删除出错啦");
                });
            }
        } else if (state.login == 0) {
            alert("需要登录哦");
        }   
    }
}