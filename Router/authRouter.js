const express = require("express");

const authRouter = express.Router();

const { signup, signin, getUser } = require("../Controller/authControler.js");
const jwtAuth = require("../middileware/jwtAuth.js");

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get('/gettinguser', jwtAuth, getUser);

module.exports = authRouter;
