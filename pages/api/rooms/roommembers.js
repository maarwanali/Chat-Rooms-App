import { addRoomMebmer } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const roommember = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { userID, rId } = req.body;

      console.log(req.body);
      await addRoomMebmer(userID, rId);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(roommember);
