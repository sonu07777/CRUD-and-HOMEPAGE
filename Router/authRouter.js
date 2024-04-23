const express = require("express");

const authRouter = express.Router();

const { signup, signin, getUser, logout } = require("../Controller/authControler.js");
const jwtAuth = require("../middileware/jwtAuth.js");

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get('/getuser', jwtAuth, getUser);
authRouter.get("/logout", jwtAuth,logout);

module.exports = authRouter;
