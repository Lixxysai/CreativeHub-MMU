const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
_______________________________________________________________________________________________________

const UsersList = {};

const ProfileStatus = require('./status')
const MessangePrivate = require('./PrivateChat')

io.on('connection', (socket) => {

    ProfileStatus(socket, io, UsersList); 
    MessangerPrivate(socket, io, UsersList);
    MessangerGroup(socket, io, UsersList);
});
