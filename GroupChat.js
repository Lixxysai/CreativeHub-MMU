module.exports = (socket, io, UsersList) => {

        socket.on("join group", async (data) => {
        const { userid, groupid } = data;
        
        socket.join(groupid);

        console.log('User ${userid} is join ${groupid}');

        io.to(groupid).emit("Someone join this group", {
          System: "Welcome $(userid) to $(groupid)",
        });
    });

    socket.on("leave group", (data) => {
        const { userid, groupid} = data;
        socket.leave(groupid);

        console.log('User ${userid} is leave ${groupid}');

        io.to(groupid).emit("Someone join this group", {
          System: "$(userid) left the group",
        });

    socket.on("disconnect", () => {
        const userid = Object.keys(UsersList).find(k => UsersList[k] === socket.id);
        
        if (userid) {
            delete UsersList[userid]; 
            console.log(`${userid} is offline`);
});
