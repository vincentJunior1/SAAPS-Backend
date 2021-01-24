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
  getChatPerRoom: (room_chat) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat WHERE chat.room_chat = ${room_chat}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
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
  },
  getChatPerId: (room_chat, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat WHERE room_chat = ${room_chat} AND user_id_to = ${id} AND chat_status = 0`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  readChatModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE chat SET ? WHERE chat_id = ? AND room_chat = ?',
        [data, id, data.room_chat],
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  countNotification: (room_chat) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) FROM chat WHERE room_chat = ? AND chat_status = 0',
        room_chat,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
