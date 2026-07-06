const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname )));
   

mongoose.connect("mongodb+srv://MMU_dbuser:MiniITG083@cluster0.3gkegze.mongodb.net/CreativeHub?appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error(err);
});

const {UsersList, postsMemoryStorage} = require('./Storage');
require('./PostSystem')(app, io, postsMemoryStorage);
require('./CommentSystem')(app, io, postsMemoryStorage); 
const ProfileStatus =require('./status');
const GlobalChat = require('./GlobalChat');
const FirstRegisterProfile = require('./FirstRegisterProfile');
const ChangeProfile = require('./ChangeProfile');
const Login = require('./Login');

io.on('connection', (socket) => {
    console.log('Socket.io server connected: ' + socket.id);
    GlobalChat(socket, io, UsersList);
    FirstRegisterProfile(socket, io, UsersList);
    ChangeProfile(socket, io, UsersList);
    ProfileStatus(socket, io, UsersList);
    Login(socket, io, UsersList);

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
