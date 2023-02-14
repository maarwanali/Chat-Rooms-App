import { getParRooms, getSpexRoom } from "../../../db/dbOpearations";
import verifyJWT from "../../../middleware/verifyJWT";

const getparrooms = async (req, res) => {
  if (req.method == "GET") {
    try {
      const userid = req.userId;

      const { recordset } = await getParRooms(userid);
      const rooms = recordset[0].rooms.split(",");

      let roomsArray = [];
      for (let i = 1; i < rooms.length; i++) {
        const data = await getSpexRoom(rooms[i]);
        roomsArray.push(data.recordset[0]);
      }

      return res.json({ status: 200, roomsArray });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
};

export default verifyJWT(getparrooms);
