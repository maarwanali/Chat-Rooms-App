import { addToNotifications } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const addnotification = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { userid, from, roomid } = req.body;
      await addToNotifications(userid, from, roomid);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(addnotification);
