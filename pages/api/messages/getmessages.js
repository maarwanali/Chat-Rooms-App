import verifyJWT from "../../../middleware/verifyJWT";
import { getMessagesForSpexRoom } from "../../../db/dbOpearations";

const getmessages = async (req, res) => {
  if (req.method == "POST") {
    try {
      const roomid = req.body;

      const { recordset } = await getMessagesForSpexRoom(roomid);

      for (let i = 0; i < recordset.length; i++) {
        const date = recordset[i].date.toISOString().split("T")[0];
        const time = recordset[i].time
          .toISOString()
          .split("T")[1]
          .split(".")[0];

        recordset[i].date = date;
        recordset[i].time = time;
      }

      return res.json({ status: 200, recordset });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(getmessages);
