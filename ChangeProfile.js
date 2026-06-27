module.exports = (socket, io, UsersList) => {

    // 1. 修改用户名
    socket.on('update_name', async (NewUserName) => {
        const OldUserName = socket.username;
        if (!OldUserName || !UsersList[OldUserName]) return;

        try {
            UsersList[NewUserName] = { ...UsersList[OldUserName] };
            delete UsersList[OldUserName];
            socket.username = NewUserName;

            console.log(`${OldUserName} changed new name to ${NewUserName}`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('update_avatar', async (NewPic) => {
        const username = socket.username;
        if (!username) return;

        try {
            console.log(`${username} changed the avatar picture`);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('introduce_bio', async (NewBio) => {
        const username = socket.username;
        if (!username) return;

        try {
            console.log(`${username} changed bio`);
        } catch (error) {
            console.error(error);
        }
    });
};
