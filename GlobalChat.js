module.exports = (socket, io, UsersList) => {

  socket.on("send global message", async (data) => {
    const { senderid, message } = data; 

    try {
      const savedMessage = await MessageModel.create({
        sender: senderid,
        content: message,
        date_time: new Date().toLocaleString()
      });

      io.emit('receive global message', {
        senderid: senderid,
        message: message,
        Date_and_Time: savedMessage.date_time
      });

      console.log(`${senderid} send a message in global chat`); 

    } catch (error) {
      console.error("global chat message send failed, error:", error);
      socket.emit('error', {
        system_message: "failed to send message on global chat"
      });
    }
  });
};
