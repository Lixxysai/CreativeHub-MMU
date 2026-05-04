module.exports = (socket, io, UsersList) => {

  socket.on("join group", async (data) => {
    const { userid, groupid } = data;
    socket.join(groupid);

    console.log(`User ${userid} joined ${groupid}`);

    io.to(groupid).emit("group notification", {
      System: `Welcome ${userid} to ${groupid}`,
    });
  });

  socket.on("send group message", async (data) => {
    const { senderid, groupid, message } = data; // Defined here

    try {
      const savedMessage = await MessageModel.create({
        sender: senderid,
        groupid: groupid,
        content: message,
        status: 'delivered',
        date_time: new Date().toLocaleString()
      });

      io.to(groupid).emit('receive group message', {
        senderid: senderid,
        message: message,
        Date_and_Time: savedMessage.date_time
      });

    } catch (error) {
      console.error("Critical Error:", error);
      socket.emit('error', {
        system_message: "Message send failed, please try again"
      });
    }
  });

  socket.on("leave group", (data) => {
    const { userid, groupid } = data;
    socket.leave(groupid);

    console.log(`User ${userid} left ${groupid}`);

    io.to(groupid).emit("group notification", {
      System: `${userid} left the group`,
    });
  });

  socket.on("disconnect", () => {
    const userid = Object.keys(UsersList).find(k => UsersList[k] === socket.id);
    if (userid) {
      delete UsersList[userid];
      console.log(`${userid} is offline`);
    }
  });
};
