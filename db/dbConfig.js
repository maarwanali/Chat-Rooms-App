const config = {
  user: process.env.NEXT_PUBLIC_USERNAME,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  server: process.env.NEXT_PUBLIC_SERVER,
  database: process.env.NEXT_PUBLIC_DATABASE,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 5555,
};

module.exports = config;

// const config = {
//   user: "abcd",
//   password: "abcd",
//   server: "LAPTOP-AQO0KMD7",
//   database: "chat",
//   options: {
//     trustServerCertificate: true,
//     trustedConnection: false,
//     enableArithAbort: true,
//     instancename: "SQLEXPRESS",
//   },
//   port: 5555,
// };

// module.exports = config;
