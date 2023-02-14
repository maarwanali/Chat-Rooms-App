import { Server } from "Socket.IO";
import { formatMessage } from "../../utils/message";

const SocketHandler = (req, res) => {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log("connecter");
        let roomId;
        let username;
        socket.on("join-room", ({ roomid, userName }) => {
          roomId = roomid;
          username = userName;
          socket.join(roomid);
          // socket.to(roomid).emit("message", `${username} joind to chat`);
        });
        socket.on("chatMessage", (msg) => {
          console.log("username from socket " + username);
          io.to(roomId).emit("message", formatMessage(username, msg));
        });
      });
    }
    res.end();
  } catch (err) {
    return res.json({ status: 500, msg: err.message });
  }
};

export default SocketHandler;
