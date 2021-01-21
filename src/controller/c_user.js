const helper = require('../helper/helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerUserModel, cekEmailUser } = require('../model/m_user')
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword,
        user_phone
      }
      const result = await registerUserModel(setData)
      return helper.response(res, 200, 'Success Add Data', setData)
    } catch (error) {
      return helper.response(res, 400, "Can't Register User", error)
    }
  },
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body
      const cekEmail = await cekEmailUser(user_email)
      if (cekEmail.length <= 0) {
        return helper.response(res, 400, 'User Not Registred')
      } else {
        console.log(cekEmail[0].user_password)
        const password = bcrypt.compareSync(
          user_password,
          cekEmail[0].user_password
        )
        console.log(password)
        if (password) {
          const {
            user_name,
            user_email,
            user_phone,
            user_status,
            user_image,
            user_lat,
            user_lng
          } = cekEmail[0]
          const payload = {
            user_name,
            user_email,
            user_phone,
            user_status,
            user_image,
            user_lat,
            user_lng
          }
          const token = jwt.sign(payload, 'SAAPPS', { expiresIn: '12h' })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success Login', result)
        } else {
          return helper.response(res, 400, 'Wrong Password')
        }
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, "Can't Login User", error)
    }
  },
  updateProfile: (req, res) => {
    try {
      console.log('oke')
    } catch (error) {
      return helper.response(res, 400, "Can't Update Profile", error)
    }
  }
}
