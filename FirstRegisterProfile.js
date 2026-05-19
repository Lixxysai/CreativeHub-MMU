module.exports = (socket, io, UsersList) => {

    socket.on('setup_first_time_profile', async (data) => {
        const { username, avatar, password } = data;

        if (!username || username.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'name cant be empty' });
            return;
        }

        if (UsersList[username]) {
            socket.emit('setup_response', { success: false, message: 'this name have been used' });
            return;
        }

        if (!password || password.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'the password cant be empty' });
            return;
        }
        
        if ( password.length<6 || password.length>12 === '') {
            socket.emit('setup_response', { success: false, message: 'the password must be between 6-12 words' });
            return;
        }
        

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            UsersList[username] = {
                avatar: avatar || 'default_avatar.png',
                password: hashedPassword, 
                socketId: socket.id
            };

            socket.username = username;

            console.log(`${username} is done the setup of profile`);
            
            socket.emit('setup_response', { success: true, username: username });

        } catch (error) {
            console.error("saving data is error", error);
            socket.emit('setup_response', { success: false, message: 'input service is error' });
        }
    }); 
};
