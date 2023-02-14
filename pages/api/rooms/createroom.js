import verifyJWT from "../../../middleware/verifyJWT";
import { createRoom } from "../../../db/dbOpearations";

const createroomReq = async (req, res) => {
  if (req.method == "POST") {
    try {
      const roomname = req.body.roomname;
      const userId = req.body.userId;
      const privacy = req.body.privacy;

      await createRoom(roomname, userId, privacy);

      return res.json({ status: 200, msg: "Room Created successfully" });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }

  if (req.method == "DELETE") {
    try {
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(createroomReq);
