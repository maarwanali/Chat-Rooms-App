import { getAllRooms } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const getrooms = async (req, res) => {
  if (req.method == "GET") {
    try {
      const { recordset } = await getAllRooms();

      return res.json({ status: 200, recordset });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default getrooms;
