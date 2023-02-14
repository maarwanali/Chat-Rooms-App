const moment = require("moment");
export function formatMessage(username, text) {
  const currentDate = new Date();
  const todayDate = currentDate.toISOString().split("T")[0];

  return {
    username: username,
    message: text,
    date: todayDate,
    time: moment().format("h:mm a"),
  };
}
