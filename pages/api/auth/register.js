const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { registerUser } from "../../../db/dbOpearations";

export default async function register(req, res) {
  if (req.method === "POST") {
    try {
      const pas = req.body.password;
      const username = req.body.username;

      const hash = await bcrypt.hash(pas, 10);

      const U = {
        username: username,
        email: req.body.email,
        password: hash,
      };

      await registerUser(U);
      // if(recordset.lenght ==0 ) return

      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: 500, msg: err.message });
    }
  }
}
