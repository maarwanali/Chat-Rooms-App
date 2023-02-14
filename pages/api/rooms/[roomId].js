import verifyJWT from "../../../middleware/verifyJWT";
import { getMessages, getSpexRoom } from "../../../db/dbOpearations";
import { Server } from "socket.io";

const roomid = async (req, res) => {
  try {
    const { roomid } = req.query;
    const { recordset } = await getMessages(roomid);
    const data = await getSpexRoom(roomid);

    const roomName = data.recordset[0].roomname;
    const privacy = data.recordset[0].privacy;
    const username = data.recordset[0].username;

    if (res.socket.server.io) {
      console.log("socket is already running");
    } else {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        socket.broadcast
          .to(roomName)
          .emit("message", `${username} has joined the chat`);
      });
    }
  } catch (err) {
    return res.status(401).end();
  }
};

export default verifyJWT(roomid);
