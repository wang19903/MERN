const router = require("express").Router();
const registerValidation = require("../vaildation").registerValidation;
const loginVaildation = require("../vaildation").loginVaildation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is comimg in to auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working"
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  //驗證輸入的資料
  console.log("Register !!!!");
  const { error } = registerValidation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  //檢查使用者是否存在
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email has already registered.");

  //註冊
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });
  try {
    const saveUser = await newUser.save();
    res.status(200).send({
      msg: "succsee",
      savedObject: saveUser
    });
  } catch (err) {
    res.status(400).send("User not saved.");
  }
});

router.post("/login", (req, res) => {
  const { error } = loginVaildation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("User not found.");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT" + token, user });
        } else {
          console.log(err);
          res.status(401).send("Wrong password");
        }
      });
    }
  });
});

module.exports = router;
