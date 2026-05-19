mmodule.exports = (socket, io, UsersList) => {

  socket.on('send messange', async (data) => {
    const { senderid, receiverid, messange } = data;

    try {
    
      const savedMessage = await MessageModel.create({
        sender: senderid,
        receiver: receiverid,
        content: messange,
        status: 'delivered',
        date_time: new Date().toLocaleString()
      });

    
      const receiverSocketID = UsersList[receiverid];

      if (receiverSocketID) {
        io.to(receiverSocketID).emit('receive messange', {
          senderid,
          messange,
          Date_and_Time: new Date().toLocaleString()
        });
        console.log(`Real-time delivery to: ${receiverid}`);
      } else {
        console.log(`User ${receiverid} is offline. Message archived.`);
      }

    } catch (error) {
      console.error("Critical Error:", error);
      socket.emit('error', {
        system_messange: "messange send failed, please try again"
      });
    }
  });

  socket.on("disconnect", () => {
    const userid = Object.keys(UsersList).find(k => UsersList[k] === socket.id);
    
    if (userid) {
      delete UsersList[userid]; 
      console.log(`[Status] ${userid} is now offline. UsersList cleaned.`);
    }
  });
};
