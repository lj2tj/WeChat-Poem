// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  var MAX_LIMIT = event.max_limit ? event.max_limit : 20
  var currentPage = event.currentPage ? event.currentPage : 0
  var _title = event.title ? event.title : ".*"
  var _author = event.author ? event.author : ".*"
  var _dynasty = event.dynasty ? event.dynasty : ".*"

  if (event.id != undefined && event.id != null) {
    // 查看具体某一首诗
    return await db.collection('poem').where({
      _id: event.id
    }).get()
  } else {
    const _ = db.command
    const countResult = await db.collection('poem').where(_.or(
      [
        {
          title: db.RegExp({
            regexp: _title,
            options: 'i',
          })
        },
        {
          author: _title
        }
      ]).and({
        dynasty: db.RegExp({
          regexp: _dynasty,
          options: 'i',
        })
      }).and({
        author: db.RegExp({
          regexp: _author,
          options: 'i',
        })
      })
    ).count()
    const total = countResult.total
    if (total === 0) {
      return { isEnd: true }
    }
    const batchTimes = Math.ceil(total / MAX_LIMIT)

    if (currentPage >= batchTimes) {
      return { isEnd: true }
    } else {
      return await db.collection('poem').where(_.or(
        [
          {
            title: db.RegExp({
              regexp: _title,
              options: 'i',
            })
          },
          {
            author: _title
          }
        ]).and({
          dynasty: db.RegExp({
            regexp: _dynasty,
            options: 'i',
          })
        }).and({
          author: db.RegExp({
            regexp: _author,
            options: 'i',
          })
        })).skip(currentPage * MAX_LIMIT).limit(MAX_LIMIT).get()
    }
  }
}