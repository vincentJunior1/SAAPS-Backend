const helper = require('../helper/helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {
  registerUserModel,
  cekEmailUser,
  cekUserModel,
  patchUserModel,
  cekCodeVerifcation
} = require('../model/m_user')
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone } = req.body
      const cekEmail = await cekEmailUser(user_email)
      console.log(cekEmail)
      if (cekEmail.length <= 0) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(user_password, salt)
        const userCode = Math.floor(Math.random() * 9999)
        const setData = {
          user_code: userCode,
          user_name,
          user_email,
          user_password: encryptPassword,
          user_phone
        }
        let transporter = nodemailer.createTransport({
          host: 'smtp.google.com',
          service: 'gmail',
          port: 465,
          secure: true,
          auth: {
            user: 'liekian71@gmail.com',
            pass: 'Jepang123_'
          }
        })
        console.log(transporter)
        let info = await transporter.sendMail({
          from: '"Admin SAAPPS 👻" <liekian71@gmail.com>', // sender address
          to: user_email, // list of receivers
          subject: 'Verification', // Subject line
          html: `Click Link For Verification<b>http://localhost:3000/user/verification/${userCode}</b>` // html body
        })
        const result = await registerUserModel(setData)
        return helper.response(res, 200, 'Success Add Data', result)
      } else {
        return helper.response(res, 400, 'Email Already Registred', error)
      }
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
            user_id,
            user_name,
            user_email,
            user_phone,
            user_status,
            user_image,
            user_lat,
            user_lng
          } = cekEmail[0]
          const payload = {
            user_id,
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
  updateProfile: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const {
        user_name,
        user_email,
        user_phone,
        user_status,
        user_lat,
        user_lng
      } = req.body
      const userDetail = await cekUserModel(user_id)
      if (userDetail.length > 0) {
        const setData = {
          user_name,
          user_email,
          user_phone,
          user_status,
          user_updated_at: new Date(),
          user_lat,
          user_lng
        }
        const result = await patchUserModel(setData, user_id)
        return helper.response(res, 200, 'Success Patch User Data', result)
      } else {
        return helper.response(res, 404, 'User Not Found')
      }
    } catch (error) {
      return helper.response(res, 400, "Can't Update Profile", error)
    }
  },
  findUserByEmail: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { emailRequest } = req.body
    } catch (error) {
      return helper.response(res, 400, 'Something Wrong', error)
    }
  },
  verificationUser: async (req, res) => {
    try {
      const { id } = req.params
      const cekCode = await cekCodeVerifcation(id)
      if (cekCode <= 0) {
        return helper.response(res, 400, 'Wrong Code')
      } else {
        const newData = {
          ...cekCode[0],
          ...{ user_status: 1 }
        }
        const result = await patchUserModel(newData, cekCode[0].user_id)
        return helper.response(res, 200, 'Success Verification User', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Something Wrong')
    }
  }
}
