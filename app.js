//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    var movies = wx.getStorageSync('movies');//从本地缓存中同步获取指定 key 对应的内容。
    if (!movies) {
      movies = this.loadMovies();
    }
    wx.setStorageSync('movies', movies);//将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
  },

  //录入电影信息
  loadMovies: function () {
    /*
    var movies = new Array();
    var movie = new Object();

    movie.id = '27063867';//唯一标识
    movie.rate = '5.4';//
    movie.title = '逗爱熊仁镇';//电影名称
    movie.url = 'https://movie.douban.com/subject/27063867/';//
    movie.cover = 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2521605043.jpg';//
    movie.type = ['喜剧', '爱情'];//
    movie.time = '2019-09-07';//
    movie.main_actor = ['朱亚文', '张榕容', '王亮'];//
    movie.director = '查慕春';//
    movies[0] = movie;

    var movie1 = new Object();
    movie1.id = '27063868';//唯一标识
    movie1.rate = '5.4';//
    movie1.title = '逗爱熊仁镇';//电影名称
    movie1.url = 'https://movie.douban.com/subject/27063867/';//
    movie1.cover = 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2521605043.jpg';//
    movie1.type = ['喜剧', '爱情'];//
    movie1.time = '2019-09-07';//
    movie1.main_actor = ['朱亚文', '张榕容', '王亮'];//
    movie1.director = '查慕春';//
    movies[1] = movie1;

    return movies;
    */
  },
  globalData: {
    userInfo: null
  }


})