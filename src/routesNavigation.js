const router = require('express').Router()
const user = require('./routes/r_user')
const chat = require('./routes/r_chat')

router.use('/user', user)
router.use('/chat', chat)

module.exports = router
