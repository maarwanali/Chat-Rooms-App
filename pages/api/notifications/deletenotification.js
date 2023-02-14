import { deleteNotification } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const deletenotification = async (req, res) => {
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

export default verifyJWT(deletenotification);
