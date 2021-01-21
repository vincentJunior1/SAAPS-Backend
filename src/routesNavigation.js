const router = require('express').Router()
const user = require('./routes/r_user')

router.use('/user', user)

module.exports = router
