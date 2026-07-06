const Message = require('./Message.model');

module.exports = (socket, io) => {

  //loading previous messages from recent chat
  socket.on('load global messages', async () => {
    try {
      const messages = await Message.find().sort({ _id: 1 });
      socket.emit('global message history', messages);
    } catch (err) {
      console.error('Error loading global messages:', err);
    }
  });

  //send messages in the global chat
  socket.on('send global message', async (data) => {
    const { senderid, message } = data;

    try {
      const newMessage = await Message.create({
        senderId: senderid,
        message: message,
      });

      io.emit('receive global message', {
        senderid: newMessage.senderId,
        message: newMessage.message,
        date_time: newMessage.date_and_time,
      });

      console.log(`${senderid} sent a message in global chat`);
    } catch (err) {
      console.error('Error sending global message:', err);
    }
  });
};
