process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  isDev: process.env.NODE_ENV === "development",
  env: process.env.NODE_ENV,
  port: 4001,
  serverUrl: process.env.SERVER_URL
};
