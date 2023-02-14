import verifayJWT from "../../../middleware/verifyJWT";
import { getuserDateForSlice } from "../../../db/dbOpearations";
const authorize = async (req, res) => {
  if (req.mehtod === "GET") {
    try {
      // const userid = req.userId;

      // const { recordset } = await getuserDateForSlice(userid);

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};
export default authorize;
