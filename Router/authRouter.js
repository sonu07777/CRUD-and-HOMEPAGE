const express = require("express")

const authRouter = express.Router();

const {signup,signin,getUser} = require("../Controller/authControler.js")

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/user",getUser)

module.exports = authRouter;

