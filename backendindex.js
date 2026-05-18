const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
_______________________________________________________________________________________________________

const UsersList = {};

const ProfileStatus = require('./status')
const MessagePrivate = require('./PrivateChat')
const GroupMessage = require ('/GroupChat')
const FirstTimeRegisterProfile = require ('/FirstRegisterProfile')
const ChangeProfile = require ('/ChangeProfile')

io.on('connection', (socket) => {

    MessangerPrivate(socket, io, UsersList);
    MessangerGroup(socket, io, UsersList);
    FirstTimeRegisterProfile(socket, io, UsersList);
    ChangeProfile(socket, io, UsersList);
    ProfileStatus(socket, io, UsersList);

});
