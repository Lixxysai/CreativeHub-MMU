module.exports = (socket, io, UsersList) => {

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
            console.log(`User ${receiverid} is offline. Message archived in Database.`);
         }

      } catch (error) {
         console.error("Critical Error saving message:", error);
         socket.emit('error', {
         system_messange: "messange send failed, please try again"
      });
      }
    }); 
};
