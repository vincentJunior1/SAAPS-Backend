const router = require('express').Router()
const {
  registerUser,
  loginUser,
  updateProfile,
  verificationUser
} = require('../controller/c_user')

const { authorization } = require('../middleware/auth')

router.post('/register/', registerUser)
router.post('/login/', loginUser)
router.patch('/editprofile/', authorization, updateProfile)
router.post('/verification/:id', verificationUser)

module.exports = router
