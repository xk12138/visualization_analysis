// pages/Custom Analysis Operations2/Custom Analysis Operations2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function (e) {
    console.log('提交表单');
    console.log(e.detail.value)
  },

  formReset: function () {
    console.log('form发生了reset事件')
  },

  goToAnalysisResultsShow: function (event) {
    wx.navigateTo({
      url: '/pages/analysis_results_show/analysis_results_show',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})