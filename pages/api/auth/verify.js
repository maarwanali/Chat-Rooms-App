import verifyJWT from "../../../middleware/verifyJWT";
import createRondomNumber from "../../../utils/rondom";
const nodemailer = require("nodemailer");
import { getEmailToVerify, verifyEmail } from "../../../db/dbOpearations";

const verify = async (req, res) => {
  let verifyNumber;
  if (req.method == "POST") {
    try {
      const number = req.body.verify;
      const userid = req.userId;

      if (verifyNumber != number) {
        return res.json({ status: 403, msg: "Wrong Number Please try again" });
      }

      await verifyEmail(userid);
      return res.json({
        status: 200,
        msg: "Thainks Email has been verifayd susccefully",
      });
    } catch (err) {
      return res.status(500).end();
    }
  }
  if (req.method == "GET") {
    try {
      verifyNumber = createRondomNumber(1555, 555555);
      const adminEmail = process.env.ADMIN_EMAIL;

      const userid = req.userId;

      const { recordset } = await getEmailToVerify(userid);
      const emailUser = recordset[0].email;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      let mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: emailUser,
        subject: "Verify Your Email",
        text: `your code verifation is : ${verifyNumber}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.json({
        status: 200,
        msg: "Go check ur Email to verify your Email",
      });
    } catch (err) {
      return res.status(500).end();
    }
  }
};

export default verifyJWT(verify);
