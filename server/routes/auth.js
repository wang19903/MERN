const router = require("express").Router();
const registerValidation = require("../vaildation").registerValidation;
const loginVaildation = require("../vaildation").loginVaildation;

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

router.post("/register", (req, res) => {
  console.log("Register !!!!");
  const { error } = registerValidation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
