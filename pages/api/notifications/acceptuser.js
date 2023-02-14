import { addRoomToUser, deleteNotification } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const acceptrequest = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { fromUser, roomId } = req.body;

      console.log(req.body);
      await addRoomToUser(roomId, fromUser);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }

  if (req.method == "DELETE") {
    try {
      const userId = req.userId;
      await deleteNotification(userId);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(acceptrequest);
