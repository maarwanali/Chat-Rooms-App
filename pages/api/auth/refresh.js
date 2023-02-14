import { getCookie } from "cookies-next";
const jwt = require("jsonwebtoken");
import { getRefreshToken } from "../../../db/dbOpearations";

export default async function refresh(req, res) {
  if (req.method == "GET") {
    try {
      const refreshToken_cookie = getCookie("refresh-token", {
        req,
        res,
        httpOnly: true,
      });
      if (!refreshToken_cookie) return res.json({ status: 401 });
      jwt.verify(
        refreshToken_cookie,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decode) => {
          if (err) return res.status(403).end;
          const userId = decode.userId;

          // get refresh token from database
          const { recordset } = await getRefreshToken(userId);

          const username = recordset[0].username;
          const rool = recordset[0].rool;
          // initiolize all data from database
          const refreshToken_db = recordset[0].refreshToken;
          const date_db = recordset[0].expirDate.toISOString().split("T")[0];
          const time_db = recordset[0].expirTime.toISOString().split("T")[1];
          const hours = time_db.split(":")[0];
          const min = time_db.split(":")[1];

          // // initiolize date of today
          const tDate = new Date().toISOString().split("T")[0];
          const tTime = new Date();
          const thours = tTime.getHours();
          const tmin = tTime.getMinutes();

          if (refreshToken_cookie != refreshToken_db)
            return res.status(401).end();

          if (tDate > date_db) return res.status(403).end();
          else if (tDate == date_db) {
            if (thours > hours) return res.status(403).end();
            else if (thours == hours) {
              if (tmin >= min) return res.status(403).end();
            }
          }

          const accessToken = jwt.sign(
            { userId: userId },
            process.env.ACCESS_TOKEN_SECRET
          );

          return res.json({ status: 200, accessToken, userId, username, rool });
        }
      );
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
}
