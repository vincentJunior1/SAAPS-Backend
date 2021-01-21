const connection = require('../config/mysql')

module.exports = {
  registerUserModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT user SET ?', data, (error, result) => {
        console.log(result)
        console.log(error)
        if (!error) {
          const newData = {
            id: result.insertId,
            ...data
          }
          resolve(data)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  cekEmailUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_email = ?',
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  cekUserModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  patchUserModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [data, id],
        (error, result) => {
          if (!error) {
            const newData = {
              user_id: id,
              ...data
            }
            resolve(newData)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  cekCodeVerifcation: (code) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_code = ?',
        code,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  addFriendModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO friend SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  cekFriendListModel: (user_id_from, user_id_to) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM friend WHERE user_id_from = ${user_id_from} AND user_id_to = ${user_id_to} AND friend_status = 1 `,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
