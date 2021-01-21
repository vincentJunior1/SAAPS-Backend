const connection = require('../config/mysql')

module.exports = {
  createRoomChatModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO room SET ?', data, (error, result) => {
        !error ? resolve(result) : reject(error)
      })
    })
  },
  getAllChat: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM room WHERE user_id_from = ${id} `,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getChatPerRoom: (room_chat, user_id_from) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat LEFT JOIN room ON chat.room_chat = room.room_chat WHERE chat.room_chat = ${room_chat} AND chat.user_id_from = ${user_id_from}`,
        (error, result) => {
          console.log(error)
          console.log(result)
        }
      )
    })
  },
  sendMessageModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
        if (!error) {
          const newData = {
            id: result.insertId,
            ...data
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
