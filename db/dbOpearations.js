const config = require("./dbConfig");
const sql = require("mssql");

// auth
const registerUser = async (U) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(
        `EXEC register @username='${U.username}', @email='${U.email}' , @password='${U.password}' `
      );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const logIn = async (username) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC logIn @username='${username}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getuserDateForSlice = async (userid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC getuserDataToSlice @userid='${userid}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const setRefreshToken = async (username, refreshToken) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(
        `EXEC setToken @username='${username}',@refreshToken='${refreshToken}'`
      );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getRefreshToken = async (userid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC getRefreshToken @userid='${userid}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// room opearation
const createRoom = async (roomname, userid, privacy) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(
        `EXEC createRoom @name='${roomname}', @userID='${userid}' ,@privacy ='${privacy}'`
      );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getAllRooms = async () => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC getRooms`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getSpexRoom = async (roomid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC getSpexRoom @roomId ='${roomid}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addRoomToUser = async (roomid, userId) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC addRoomToUser @roomid ='${roomid}',@userid ='${userId}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getParRooms = async (userId) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC getParRooms @userid ='${userId}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getMineRooms = async (userId) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC getmineRooms @userid ='${userId}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const editRoomPrivacy = async (roomid, status) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC editRoomPrivacy @roomid ='${roomid}', @status='${status}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteRoom = async (roomid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC deleteRoom @roomid ='${roomid}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// add rooms mebmers

const addRoomMebmer = async (userid, roomid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC addRoomMember @userid='${userid}' ,@roomid ='${roomid}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// messages operation

const getMessagesForSpexRoom = async (roomid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC getMessagesForSpexRoom @roomid ='${roomid}'`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addMessage = async (userid, message, date, time, roomid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(
        `EXEC addMessage @userid='${userid}' ,@msg='${message}' , @date ='${date}' ,@time ='${time}',@roomid ='${roomid}'`
      );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// notificatios Opearations

const addToNotifications = async (userid, from, roomid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(
        `EXEC addToNotifications @userid='${userid}',@from='${from}', @roomid ='${roomid}' `
      );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getNotification = async (userid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC getNotification @userid='${userid}' `);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteNotification = async (userid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC removeNotification @userid='${userid}' `);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// verify email

const getEmailToVerify = async (userid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool
      .request()
      .query(`EXEC getEmailToVerify @userid='${userid}' `);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const verifyEmail = async (userid) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`EXEC verifyEmail @userid='${userid}' `);
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  logIn,
  getuserDateForSlice,
  setRefreshToken,
  getRefreshToken,
  createRoom,
  getAllRooms,
  getSpexRoom,
  addRoomToUser,
  getParRooms,
  getMineRooms,
  deleteRoom,
  editRoomPrivacy,
  addRoomMebmer,
  getMessagesForSpexRoom,
  addMessage,
  addToNotifications,
  getNotification,
  deleteNotification,
  getEmailToVerify,
  verifyEmail,
};
