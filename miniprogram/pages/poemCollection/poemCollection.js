// pages/poemCollection/poemCollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getPoemCollection',
      // 传给云函数的参数
      data: {
      },
      success: function (res) {
        if (!res.isEnd && res.result.data != undefined) {
          that.setData({
            collectionList: res.result.data
          })
        }
      },
      fail: err => {
        console.error('[云函数] [getPoemCollection] 调用失败', err)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
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