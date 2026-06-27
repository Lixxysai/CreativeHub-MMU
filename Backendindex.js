const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

const { UsersList, postsMemoryStorage } = require('./storage'); 

require('./PostSystem')(app, io, postsMemoryStorage); 
require('./comments')(app, io, postsMemoryStorage); 

const ProfileStatus = require('./status');
const GlobalChat = require('./GlobalChat'); 
const FirstTimeRegisterProfile = require('./FirstTimeRegisterProfile'); 
const ChangeProfile = require('./ChangeProfile');

io.on('connection', (socket) => {
    // 传递 socket, io 和 在线看板 UsersList
    GlobalChat(socket, io, UsersList);
    FirstTimeRegisterProfile(socket, io, UsersList);
    ChangeProfile(socket, io, UsersList);
    ProfileStatus(socket, io, UsersList);
});

server.listen(3000, () => console.log('server is active by 3000'));
