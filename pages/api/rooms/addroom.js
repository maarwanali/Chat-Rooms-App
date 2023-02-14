import {
  addRoomToUser,
  getParRooms,
  addToNotifications,
} from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const addroom = async (req, res) => {
  if (req.method == "POST") {
    try {
      const roomid = req.body.rId;
      const privacy = req.body.privacy;
      const owner = req.body.userId;
      const userId = req.userId;

      console.log(req.body);
      const { recordset } = await getParRooms(userId);
      const rooms = recordset[0].rooms.split(",");

      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i] == roomid) {
          return res.json({
            status: 301,
            msg: "You are alyredy joined to this room",
          });
        }
      }

      if (privacy == "1") {
        await addToNotifications(owner, userId, roomid);

        return res.json({
          status: 200,
          msg: "Request has been sended successfully",
        });
      }
      await addRoomToUser(roomid, userId);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};
export default verifyJWT(addroom);
