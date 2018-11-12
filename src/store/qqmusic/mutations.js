export default {
    // 确认登陆
    querendenglu(state, payload) {
        state.login = payload.status;
        state.loginModule = payload.status;
        state.id = payload.lg.id;
        state.nikeName = payload.lg.nikeName;
        state.like.songList = payload.songList;
        state.likeLength = payload.songList.length;
        state.like.albumList = payload.albumList;
        console.log(payload)
        // console.log(payload.status)
    },
    // 记录搜索历史
    sethistory(state, payload) {
        // push返回的是一个数组的长度
        state.searchHistory.push(payload);
        var xin = new Set(state.searchHistory);
        state.searchHistory = [...xin]
    },
    // 退出登录
    restore(state, payload) {
        state.login = 0;
        state.loginModule = "0";
        state.id = null;
        state.nikeName = "立即登录享专属推荐";
        state.like.songList = null;
        state.like.albumList = null;
        state.likeLength = null;
        state.searchList = null;
        state.searchHistory = [];
        state.setplaying.Ilike = false
        // console.log(state.login)
    },
    // 设置播放数据
    changePlaying(state, payload) {
        state.setplaying.dataState = true;
        state.setplaying.playingList.push(payload)
        // es6去重
        const xin = new Set(state.setplaying.playingList)
        state.setplaying.playingList =[...xin]
        // 返回歌曲在播放列表里的index
        state.setplaying.index = state.setplaying.playingList.indexOf(payload);
        state.setplaying.playerState = true;
        // 判断是否为我喜欢歌曲
        if(state.login == 1){
            if(state.like.songList.indexOf(payload) != -1){
                state.setplaying.Ilike = true;
            }
        }else if(state.login ==0){
            state.setplaying.Ilike = false
        }
        if(state.like.songList.indexOf(payload) == -1){
            state.setplaying.Ilike = false;
        }
    },
    // 切歌 上一首 下一首
    QIEGE(state,payload){
        if(payload == 0 && state.setplaying.index == 0){
            state.setplaying.index = state.setplaying.playingList.length -1
        }else if(payload == 1 && state.setplaying.index == state.setplaying.playingList.length -1){
            state.setplaying.index = 0
        }else if(payload == 0){ 
            state.setplaying.index -= 1
        }else if(payload == 1){
            state.setplaying.index += 1
        }
    },
    // 设置歌曲index
    changeIndex(state,payload){
        if(payload == 'xunhuan'){
            state.setplaying.index = 0
        }        
    },
    // 改变播放状态
    changePlayerState(state,payload){
        state.setplaying.playerState = payload;
        
    },
    // 改变我喜欢的歌曲列表
    ChangeLIKESong(state,payload){
        state.like.songList = payload[0];
        state.likeLength = payload[0].length;
        state.setplaying.Ilike = payload[1]
    },
    // 从播放列表中删除选中歌曲
    DELbofangsing(state,payload){
        // 删除选中项
        state.setplaying.playingList.splice(payload[1],1);
        // 判断修改state的index
        if(state.setplaying.index > payload[1]){
            state.setplaying.index = state.setplaying.index-1
        }else if(state.setplaying.index == payload[1]){
            if(state.setplaying.playingList.length ==0){
                state.setplaying.dataState = false;
                state.setplaying.playerState = false;
                state.setplaying.playingList = [];
                state.setplaying.index = "";
            }
        }

    },
    // 清空播放列表
    DELbofangALL(state){
        state.setplaying.dataState = false;
        state.setplaying.playerState = false;
        state.setplaying.playingList = [];
        state.setplaying.index = "";
    }
}
