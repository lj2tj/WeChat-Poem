// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  // event.title : 诗集名称
  if (event.title != undefined && event.title != null) {
    // 查看具体某一首诗
    return await db.collection('poem_collection').where({
      title: event.title
    }).get()
  } else{
    return await db.collection('poem_collection').get()
  }
}