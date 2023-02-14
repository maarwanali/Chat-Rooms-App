import verifyJWT from "../../../middleware/verifyJWT";
import { editRoomPrivacy } from "../../../db/dbOpearations";

const editroom = async (req, res) => {
  if (req.method == "POST") {
    try {
      const roomId = req.body.rId;
      const status = req.body.status;
      console.log(typeof status);
      await editRoomPrivacy(roomId, status);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(editroom);
