//dynasty.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynastyList: null,
    src : '../mini_dynasty.png',
  },

  onLoad: function (){
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDynasty',
      // 传给云函数的参数
      data: { },
      success: function (res) {
        console.log(res.result)
        that.setData({
          dynastyList: res.result.data
        })
      },
      fail: err => {
        console.error('[云函数] [getDynasty] 调用失败', err)
        wx.navigateTo({
          url: '../index/index',
        })
      }
    })
  }
})
