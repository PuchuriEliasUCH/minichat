const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server)

app.get('/', (req, res)=>{
    res.sendfile(join(__dirname, 'index.html'))
});

io.on('connection', (socket)=>{
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
})

server.listen(process.env.PORT || 3001, () => {
    console.log(`server running in port ${process.env.PORT}`)
});
