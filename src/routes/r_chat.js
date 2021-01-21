const router = require('express').Router()
const {
  createRoomChat,
  getAllRoomChat,
  getChatPerRoom,
  sendMessage
} = require('../controller/c_chat')
const { authorization } = require('../middleware/auth')

router.post('/chatroom/:id', authorization, createRoomChat)
router.get('/getallchat/', authorization, getAllRoomChat)
router.get('/getchat/:id', authorization, getChatPerRoom)
router.post('/sendmessage/:id', authorization, sendMessage)

module.exports = router
