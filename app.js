const express = require("express");
const authRouter = require("./Router/authRouter");
const connect_to_db = require("./db_connections/connection");
const cors = require("cors")
const app = express();
// const coolieparser = require("cookie-parser");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
connect_to_db();
app.use("/api", authRouter);
app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server", name: "sonu sahoo" });
});
  
module.exports = app;
