const router = require('express').Router()
const {
  createRoomChat,
  getAllRoomChat,
  getChatPerRoom,
  sendMessage,
  readChat,
  getFriendList,
  deleteChat
} = require('../controller/c_chat')
const { authorization } = require('../middleware/auth')

router.post('/chatroom/:id', authorization, createRoomChat)
router.get('/getallchat/', authorization, getAllRoomChat)
router.get('/getallfriends/', authorization, getFriendList)
router.get('/getchat/:id', authorization, getChatPerRoom)
router.post('/sendmessage/:id', authorization, sendMessage)
router.patch('/readmessage/:id', authorization, readChat)
router.patch('/deletechat/:id', authorization, deleteChat)

module.exports = router
