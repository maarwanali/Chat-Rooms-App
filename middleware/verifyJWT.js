const jwt = require("jsonwebtoken");

export default function verifyJWT(handler) {
  return async function (req, res) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).end();

      const accessToken = authHeader.split(" ")[1];
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
          if (err) return res.status("403").end();
          req.userId = decode.userId;

          return handler(req, res);
        }
      );
    } catch (err) {
      return res.status(401).end();
    }
  };
}
