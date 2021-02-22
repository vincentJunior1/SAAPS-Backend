const helper = require('../helper/helper')
const {
  createRoomChatModel,
  getAllChat,
  getChatPerRoom,
  sendMessageModel,
  getChatPerId,
  readChatModel,
  getAllFriendList,
  getLastMessage,
  getChatPerRoomAndId,
  deleteChatModel
} = require('../model/m_chat')

module.exports = {
  createRoomChat: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const roomChat = Math.floor(Math.random() * 9999)
      const newRoomFrom = {
        room_chat: roomChat,
        user_id_from: user_id,
        user_id_to: id
      }
      await createRoomChatModel(newRoomFrom)
      const newRoomFor = {
        room_chat: roomChat,
        user_id_from: id,
        user_id_to: user_id
      }
      await createRoomChatModel(newRoomFor)
      return helper.response(
        res,
        200,
        'Success Make New Room Chat',
        newRoomFrom[0]
      )
    } catch (error) {
      return helper.response(res, 400, "Can't Make Room Chat", error)
    }
  },
  getAllRoomChat: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const roomChat = await getAllChat(user_id)
      for (let i = 0; i < roomChat.length; i++) {
        let temp = ''
        temp = await getLastMessage(roomChat[i].room_chat)
        roomChat[i].chat_content = temp
      }
      if (roomChat.length > 0) {
        return helper.response(res, 200, 'Success Get All Room Chat', roomChat)
      } else {
        return helper.response(res, 404, 'Room Chat Not Found')
      }
    } catch (error) {
      return helper.response(
        res,
        400,
        'Something Wrong When Get All Chat',
        error
      )
    }
  },
  getChatPerRoom: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const getChat = await getChatPerRoom(id, user_id)
      return helper.response(res, 200, 'Success Get Chat Per Room', getChat)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Something Wrong With This Chat', error)
    }
  },
  sendMessage: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const { user_id_to, chat_content } = req.body
      const message = {
        room_chat: id,
        user_id_from: user_id,
        user_id_to: user_id_to,
        chat_content,
        chat_status: 0,
        chat_updated_at: new Date()
      }
      const result = await sendMessageModel(message)
      return helper.response(res, 200, 'Success Send Message', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Failed Send Message', error)
    }
  },
  readChat: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const getChat = await getChatPerId(id, user_id)
      getChat.map(async (x) => {
        x = { ...x, ...{ chat_status: 1 } }
        await readChatModel(x, x.chat_id)
      })
      return helper.response(res, 200, 'Success Read Chat')
    } catch (error) {
      return helper.response(res, 400, 'Failed Read Chat', error)
    }
  },
  getFriendList: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const result = await getAllFriendList(user_id)
      return helper.response(res, 200, 'Success Get All Friend list', result)
    } catch (error) {
      return helper.response(res, 400, 'Something Wrong', error)
    }
  },
  deleteChat: async (req, res) => {
    try {
      const { id } = req.params
      const data = await getChatPerRoomAndId(id)
      data.map(async (x) => {
        delete x.room_id
        x = { ...x, ...{ room_status: 0 } }
        console.log(x)
        await deleteChatModel(x, id)
      })
      return helper.response(res, 200, 'Success Delete Chat')
    } catch (error) {
      console.log(error)
      return helper.response(
        res,
        400,
        'Failed To Delete Chat please try again',
        error
      )
    }
  }
}
