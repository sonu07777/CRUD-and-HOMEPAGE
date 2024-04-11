
const emailValidator = require("email-validator");
const userSchema = require("../config/userSchema.js");

const signup = async (req, res, next) => {
  const { name, email, mobile_no, password, conform_password } = req.body;
  console.log(name, email, mobile_no, password, conform_password);
  const validator =
    emailValidator.validate(
      email
    ); /*it automatically fetch the email and after that you check */
  if (!email) {
    res
      .status(400)
      .json({ success: "false", message: "this email is already present " });
  }
  // res.status(200).json({
  //   success: true,
  //   data: { users },
  // });

  if (password != conform_password) {
    res.status(400).json({ message: "this email is already present " });
  }
  try {
    const users = userSchema(req.body);
    const result = await users.save();
    if (!name || !email || !mobile_no) {
      res.status(400).json({
        success: false,
        message: " all filed must be required",
      });
    }
  } catch (error) {
    if (
      error.code ===
      11000 /*it automatically recognize if any duplicate value is present in database */
    ) {
      res.status(400).json({
        success: false,
        message: "this id is already present",
      });
    }
    console.log("it have some error", error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    res.status(400).message("enter the email  and password properly");
  }

  try {
    const check = await userSchema
      .findOne({
        email,
      })
      .select("+password");
    if (!check || userSchema.password === password) {
      res.status(400).json({
        success: false,
        message: " please enter the proper email and password",
      });
    }
    const token = check.jwtToken();
    userSchema.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "successfully yu are done the sign in ",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "wrong id and password",
    });
  }
};

const getUser = async(req,res) =>{
  const userId = req.user.id;


  try {
    const useridDet = await userSchema.findById(userId)
    return res.status(200).json({
      success:true,
      data:useridDet
    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:"you have some error"
    })
  }
} 

module.exports = {
  signup,
  signin,
  getUser
};
