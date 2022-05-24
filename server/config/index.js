/*
  服务器和数据库的配置
 */
const isDev = process.env.NODE_ENV === "development";

// mongodb的配置
const MONGO_CONFIG = {
  port: 27017,
  host: "localhost",
  database: "react_mobile",
};
// 服务器配置
let SERVER_CONFIG = {
  port: 80,
  host: "0.0.0.0",
};

if (isDev) {
  SERVER_CONFIG = {
    port: 5000,
    host: "localhost",
  };
}

//github授权-网站标识
const CLIENT_ID = "2b3178d188267a7fca6c";
//github授权-网站机密码
const CLIENT_SECRET = "6252419a12c8536695c603fe9c7eb8bdc12fe36a";
//密码加盐
const SECRET = "A0d2afW6Ysa";

module.exports = {
  MONGO_CONFIG,
  SERVER_CONFIG,
  SECRET,
  CLIENT_ID,
  CLIENT_SECRET,
};
