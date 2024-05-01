// pages/authors/authors.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authors: null,
    name:null,
    dynasty: null,
    poemCollection: null,
    currentPage: 0, //当前页码
    max_limit: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '请稍候',
      icon: 'loading'
    })

    const id = options.id ? options.id : null //诗人ID
    const dynasty = options.dynasty ? options.dynasty : null //朝代名
    const poemCollection = options.poemCollection ? options.poemCollection : null //诗集名
    const MAX_LIMIT = getApp().globalData.LIST_MAX_LIMIT  //列表每页最多显示数量
    this.setData({
      max_limit: MAX_LIMIT,
      dynasty: dynasty,
      poemCollection: poemCollection
    })

    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAuthor',
      // 传给云函数的参数
      data: {
        id: that.data.id,
        dynasty: that.data.dynasty,
        poemCollection: that.data.poemCollection,
        max_limit: that.data.max_limit,
        currentPage: that.data.currentPage
      },
      success: function (res) {
        if (!res.isEnd && res.result.data) {
          that.setData({
            authors: res.result.data
          })
        }
      },
      fail: err => {
        console.error('[云函数] [getAuthor] 调用失败', err)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '请稍候',
      icon: 'loading'
    })

    var that = this;
    if (that.data.currentPage === 0) {
      wx.showToast({
        title: '已经是第一页了',
        icon: 'success',
        duration: 2000
      })
      return false
    }

    var page_number = that.data.currentPage - 1
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAuthor',
      // 传给云函数的参数
      data: {
        name: that.data.name,
        dynasty: that.data.dynasty,
        poemCollection: that.data.poemCollection,
        max_limit: that.data.max_limit,
        currentPage: page_number
      },
      success: function (res) {
        if (res.isEnd || res.result.data == undefined) {
          wx.showToast({
            title: '已经是最后一页了',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            authors: res.result.data,
            currentPage: that.data.currentPage - 1
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '请稍候',
      icon: 'loading'
    })

    var that = this;
    var page_number = that.data.currentPage + 1
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAuthor',
      // 传给云函数的参数
      data: {
        name: that.data.name,
        dynasty: that.data.dynasty,
        poemCollection: that.data.poemCollection,
        max_limit: that.data.max_limit,
        currentPage: page_number
      },
      success: function (res) {
        if (res.isEnd || res.result.data == undefined || res.result.data.length == 0) {
          wx.showToast({
            title: '已经是最后一页了',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            authors: res.result.data,
            currentPage: that.data.currentPage + 1
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

  inputName: function(e) {
    if (e.detail.value === "") {
      e.detail.value = null
    }
    this.setData({
      name: e.detail.value
    })
  },

  searchAuthor:function(){
    wx.showToast({
      title: '请稍候',
      icon: 'loading'
    })

    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAuthor',
      // 传给云函数的参数
      data: {
        name: that.data.name,
        dynasty: that.data.dynasty,
        poemCollection: that.data.poemCollection,
        max_limit: that.data.max_limit,
        currentPage: 0
      },
      success: function (res) {
        if (res.isEnd || res.result.data == undefined) {
          wx.showToast({
            title: '暂无这位诗人',
            icon: 'success',
            duration: 2000
          })
        } else {
          that.setData({
            authors: res.result.data,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})