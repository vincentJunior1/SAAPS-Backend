const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateProfile,
  verificationUser,
  findUserByEmail,
  addUser
} = require('../controller/c_user')

const { authorization } = require('../middleware/auth')

router.post('/register/', registerUser)
router.post('/login/', loginUser)
router.patch('/editprofile/', authorization, updateProfile)
router.post('/verification/:id', verificationUser)
router.get('/finduser', authorization, findUserByEmail)
router.post('/addfriend/:id', authorization, addUser)

module.exports = router
