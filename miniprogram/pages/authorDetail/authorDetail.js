// pages/authorDetail/authorDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: null,
    poemList: null,
    isFolded: true,
  },
  /**
   * 展开或折叠诗人描述信息
   */
  change: function (e) {
    this.setData({
      isFolded: !this.data.isFolded,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAuthor',
      // 传给云函数的参数
      data: { name: options.name },
      success: function (res) {
        that.setData({
          author: res.result.data[0]
        })
      },
      fail: err => {
        console.error('[云函数] [getDynasty] 调用失败', err)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getPoem',
      // 传给云函数的参数
      data: { 
        author: options.name,
        max_limit: 100
      },
      success: function (res) {
        if (res.isEnd || res.result.data == undefined) {
          wx.showToast({
            title: '暂无相关诗词',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            poemList: res.result.data
          })
        }
      },
      fail: err => {
        console.error('[云函数] [getPoem] 调用失败', err)
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