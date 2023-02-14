import verifyJWT from "../../../middleware/verifyJWT";
import { deleteRoom } from "../../../db/dbOpearations";

const deleteroom = async (req, res) => {
  if (req.method == "POST") {
    try {
      const roomid = req.body.roomid;
      const userid = req.body.userid;
      const userID = req.userId;

      console.log(req.body);
      if (userID != userid) {
        return res.status(401).end();
      }
      await deleteRoom(roomid);

      return res.json({ status: 200, msg: "Room Deleted successfully" });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(deleteroom);
