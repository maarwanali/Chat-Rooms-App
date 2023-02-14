import verifyJWT from "../../../middleware/verifyJWT";
import { getMineRooms } from "../../../db/dbOpearations";

const getminerooms = async (req, res) => {
  if (req.method == "GET") {
    try {
      const userid = req.userId;

      const { recordset } = await getMineRooms(userid);

      return res.json({ status: 200, recordset });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(getminerooms);
