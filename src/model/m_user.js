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
  }
}
