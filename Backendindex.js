const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname )));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

mongoose.connect(process.env.MONGO_URI)
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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
