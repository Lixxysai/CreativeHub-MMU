module.exports = (socket, io, UsersList) => {

  socket.on('online', (username) => {
      socket.username = username;          
      
      UsersList[username] = { socketId: socket.id, status: "online" }; 

      io.emit('status_change', {
          username: username,
          status: "online"
      });
  });

  socket.on('busy', () => {
      const username = socket.username;
      if (username && UsersList[username]) {
          UsersList[username].status = "busy";

          io.emit('status_change', {
              username: username,
              status: "do not disturb"
          });
      }
  });

  socket.on('afk', () => {
      const username = socket.username;
      if (username && UsersList[username]) {
          UsersList[username].status = "afk";

          io.emit('status_change', {
              username: username,
              status: "AFK"
          });
      }
  });

  socket.on('invisible', () => {
      const username = socket.username;
      if (username && UsersList[username]) {
          UsersList[username].status = "invisible";

          io.emit('status_change', {
              username: username,
              status: "offline"
          });
      }
  });

  socket.on('disconnect', () => {
      const username = socket.username;
      if (username && UsersList[username]) {
          
          delete UsersList[username]; 
          
          io.emit('status_change', {
              username: username,
              status: "offline"
          });
          console.log(`${username} offline, delete already。`);
      }
  });
};
