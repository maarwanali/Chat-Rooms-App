import verifyJWT from "../../../middleware/verifyJWT";
import { addMessage } from "../../../db/dbOpearations";

const addmessage = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { userId, input, date, time, roomid } = req.body;
      console.log(req.body);
      await addMessage(userId, input, date, time, roomid);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(addmessage);
