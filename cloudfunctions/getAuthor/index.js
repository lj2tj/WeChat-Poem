// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  var MAX_LIMIT = event.max_limit ? event.max_limit : 20
  var currentPage = event.currentPage ? event.currentPage : 0
  
  var _name = event.name ? event.name : ".*"
  var _dynasty = event.dynasty ? event.dynasty : ".*"
  const _ = db.command

  const countResult = await db.collection('author').where(_.and(
    {
      name: db.RegExp({
        regexp: _name,
        options: 'i',
      })
    }
  ).and(
    {
      dynasty: db.RegExp({
        regexp: _dynasty,
        options: 'i',
      })
    }
  )).count()
  const total = countResult.total
  if (total === 0) {
    return { isEnd: true }
  } else {
    return await db.collection('author').where(_.and(
      {
        name: db.RegExp({
          regexp: _name,
          options: 'i',
        })
      }
    ).and(
      {
        dynasty: db.RegExp({
          regexp: _dynasty,
          options: 'i',
        })
      }
    )).orderBy('start_year', 'asc').skip(currentPage * MAX_LIMIT).limit(MAX_LIMIT).get()
  }
}