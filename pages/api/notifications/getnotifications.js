import { getNotification } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const getnotification = async (req, res) => {
  if (req.method == "GET") {
    try {
      const userid = req.userId;
      const { recordset } = await getNotification(userid);

      return res.json({ status: 200, recordset });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(getnotification);
