// miniprogram/pages/dynastyDetail/dynastyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynasty: null,
    isFolded: true,
  },

  /**
   * 页面相关事件处理函数--停止加载
   */
  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '请稍候',
      icon: 'loading'
    })

    var that = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDynasty',
      // 传给云函数的参数
      data: { 
        name: options.name
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          dynasty: res.result.data[0]
        })
      },
      fail: err => {
        console.error('[云函数] [getDynasty] 调用失败', err)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
  },

  /**
   * 展开或折叠朝代描述信息
   */
  change: function (e) {
    this.setData({
      isFolded: !this.data.isFolded,
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