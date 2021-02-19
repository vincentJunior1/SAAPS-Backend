const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateProfile,
  verificationUser,
  findUserByEmail,
  addUser,
  changePassword
} = require('../controller/c_user')
const uploadFilter = require('../middleware/multerProfile')

const { authorization } = require('../middleware/auth')

router.post('/register/', registerUser)
router.post('/login/', loginUser)
router.patch('/editprofile/', authorization, uploadFilter, updateProfile)
router.post('/verification/:id', verificationUser)
router.post('/finduser', authorization, findUserByEmail)
router.post('/addfriend/:id', authorization, addUser)
router.patch('/changepassword/', authorization, changePassword)

module.exports = router
