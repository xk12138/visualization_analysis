// pages/Movies/Movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFolded: true,
    movie: [],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  loadMovie: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/movie/?index=' + this.data.index,
      method: 'GET',
      success: function(res) {
        console.log(res);
        var data = res.data;
        var movie = that.data.movie;
        for( var i = 0; i < data.length; i++) {
          movie.push(data[i]);
        }
        console.log(movie);
        that.setData({
          movie: movie,
          index: that.data.index + 1
        })
      }
    })
  },

  goToModelResultsShow: function (event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/model_results_show/model_results_show?id=' + event.currentTarget.id
    })
  },

  onReachBottom: function() {
    this.loadMovie();
  },
  
  foldChange: function (e) {
    this.setData({
      isFolded: !this.data.isFolded,
    })
  }
})
