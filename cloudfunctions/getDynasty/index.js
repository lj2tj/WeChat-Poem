// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  // event.id : 朝代的ID
  if (event.name != undefined && event.name != null) {
    return await db.collection('dynasty').where({
      name: event.name
    }).get()
  } else {
    //朝代列表
    return await db.collection('dynasty').get()
  }
}