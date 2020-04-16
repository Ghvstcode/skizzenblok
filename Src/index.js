const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../Public')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

const generateMessage = (text) => {
    return {
        text,
    }
}

io.on('connection', (socket)=> {
    socket.on('join', ()=> {
        socket.broadcast.emit('message',generateMessage("A new User Is Online"))
    })

    socket.on('sketch', (sketch, callback)=> {
        io.emit('resketch', sketch)
        callback()
    })
})

server.listen(port, ()=> {
    console.log('Sever is up on port ' + port)
})