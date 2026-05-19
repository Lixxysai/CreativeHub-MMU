module.exports = (socket, io, UsersList) => {

   // online status
  socket.on('online', (username) => {
        socket.username = username;          
        UsersList[username] = { id: socket.id, status: "online" }; 

      io.emit('status_change', {
        username: username,
        status: "online"
      })
  });

   // busy status
  socket.on('busy', () => {
          const username = socket.username;
          if (username && UsersList[username]) {
          UsersList[username].status = "busy";
 
        io.emit('status_change',{
          username: username,
          status: "do not disturb"
        });
      }
  });

   // idle or afk status
  socket.on('afk', () => {
          const username = socket.username;
          if (username && UsersList[username]) {
          UsersList[username].status = "afk";
 
        io.emit('status_change',{
          username: username,
          status: "AFK"
        });
      }
  });

  // invisible status
  socket.on('invisible', () => {
          const username = socket.username;
          if (username && UsersList[username]) {
          UsersList[username].status = "invisible";
 
        io.emit('status_change',{
          username: username,
          status: "offline"
        });
      };
  });

   // offline status
  socket.on('disconnect',() => {
          const username = socket.username;
          if (username && UsersList[username]) {
          delete UsersList[username]
          
        io.emit('status_change',{
          username: username,
          status: "offline"
       });
      }
  });
};
