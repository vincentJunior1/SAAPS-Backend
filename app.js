const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routerNavigation = require('./src/routesNavigation')
const socket = require('socket.io')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())

app.use('/api3', express.static('uploads'))
const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/api3/socket.io'
})
io.on('connection', (socket) => {
  console.log('Socket.Io Connect')
  socket.on('globalMessage', (data) => {
    io.emit('chatMessage', data)
  })
  socket.on('privateMessage', (data) => {
    socket.broadcast.to(data.room).emit('chatMessage', data)
    socket.emit('chatMessage', data)
  })
  socket.on('broadcastMessage', (data) => {
    socket.broadcast.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    socket.join(data.room)
  })
  socket.on('changeRoom', (data) => {
    console.log('change room')
    socket.leave(data.oldRoom)
    socket.join(data.room)
  })
  socket.on('roomMessage', (data) => {
    console.log(data)
    io.to(data.room_chat).emit('chatMessage', data)
  })
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typingMessage', data)
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api3', routerNavigation)

server.listen(3000, () => {
  console.log('Listening on Port 3000')
})
