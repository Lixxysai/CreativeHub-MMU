const bcrypt = require('bcrypt');
// const UserModel = require('./models/User');

module.exports = (socket, io, UsersList) => {

    socket.on('setup_first_time_profile', async (data) => {
        const { username, avatar, password } = data;

        if (!username || username.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'name cant be empty' });
            return;
        }

        if (!password || password.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'the password cant be empty' });
            return;
        }

        if (password.length < 6 || password.length > 12) {
            socket.emit('setup_response', { success: false, message: 'the password must be between 6-12 words' });
            return;
        }

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            UsersList[username] = {
                socketId: socket.id,
                status: "online"
            };

            socket.username = username;
            console.log(`${username} is done the setup of profile and saved to MongoDB`);
            
            socket.emit('setup_response', { success: true, username: username });

        } catch (error) {
            console.error("saving data to MongoDB error", error);
            socket.emit('setup_response', { success: false, message: 'input service is error' });
        }
    }); 
};
