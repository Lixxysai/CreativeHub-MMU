module.exports = (socket, io, UsersList) => {

    socket.on('update_name', (NewUserName) => {
        const OldUserName = socket.username;
        if (OldUserName && UsersList[OldUserName]) {
            UsersList[NewUserName] = { ...UsersList[OldUserName] };
            
            delete UsersList[OldUserName];

            socket.username = NewUserName;

            console.log(`${oldName} changed new name, ${NewUserName}`);
        }
    });

    socket.on('update_avatar', (NewPic) => {
        const username = socket.username;
        if (username && UsersList[username]) {
            UsersList[username].avatar = NewPic;

            console.log(`${userid} changed the avatar picture`);
        
        }
    });

    socket.on('introduce_bio',(NewBio) => {
        const OldBio = socket.UserBio;
        if (OldBio && UsersList[OldBio]) {
            UsersList[NewBio] = { ...UsersList[OldBio] };
            
            delete UsersList[OldBio];

            socket.UserBio = NewBio;

            console.log(`${userid} changed bio`);
        }
    });
};
