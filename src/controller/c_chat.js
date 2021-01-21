const helper = require('../helper/helper')
const {
  createRoomChatModel,
  getAllChat,
  getChatPerRoom,
  sendMessageModel
} = require('../model/m_chat')

module.exports = {
  createRoomChat: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const roomChat = Math.floor(Math.random() * 9999)
      const newRoomFrom = [
        {
          room_chat: roomChat,
          user_id_from: user_id,
          user_id_to: id
        },
        {
          room_chat: roomChat,
          user_id_from: id,
          user_id_to: user_id
        }
      ]
      await createRoomChatModel(newRoomFrom)
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
      console.log(getChat)
    } catch (error) {
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
        chat_content
      }
      const result = await sendMessageModel(message)
      return helper.response(res, 200, 'Success Send Message', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Failed Send Message', error)
    }
  }
}
