const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

server.listen(3000)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

users = []
connections = []

io.sockets.on('connection', function(socket) {
    console.log('Подключился')
    connections.push(socket)

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Отключился')
    })

    socket.on('sendMessage', function(data) {
        io.sockets.emit('add mess', {
            msg: data
        })
    })
})