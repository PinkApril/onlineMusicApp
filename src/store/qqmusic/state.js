export default{
    // 登录状态
    login: 0 ,
    loginModule:"0",
    // 账号id
    id : null,
    // 账号昵称
    nikeName:"立即登录享专属推荐",
    pass:"",
    // 账号里的信息【我喜欢的歌曲和专辑】
    like:{
        songList:null,
        albumList:null,
    },
    // 首页显示【我喜欢的歌曲】数量
    likeLength:null,
    // 搜索结果列表
    searchList:null,
    // 搜索历史
    searchHistory:[],
    // 设置播放的歌曲数据
    setplaying:{
        dataState:false, //数据初始状态为false 一旦有数据填充 则变为true
        index:"", //新添加选中歌曲在播放列表【playingList】中的位置  用来确定播放的歌曲
        // 播放列表 每次选中和播放过的歌曲都会加入播放列表
        playingList:[
            // {存入的数据格式
            //     imageURL:0,
            //     singCi:0,
            //     singName:0,
            //     singURL:0,
            //     singZj:0,
            //     singerName:0,
            // }
        ],
        // 播放/暂停按钮
        playerState:false,
        // 是否在我喜欢列表
        Ilike:false,
    }
}