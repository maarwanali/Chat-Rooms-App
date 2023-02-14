import { deleteCookie } from "cookies-next";

export default async function logout(req, res) {
  if (req.method == "GET") {
    try {
      deleteCookie("refresh-token", { req, res });
      return res.json({ status: 200 });
    } catch (err) {
      return res.json({ status: fasle, msg: err.message });
    }
  }
}
