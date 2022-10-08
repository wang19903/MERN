const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../vaildation").courseValidation;

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

router.post("/", async (req, res) => {
  //驗證輸入的資料
  const { error } = courseValidation(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  console.log("course: " + req);
  let { title, description, price } = req.body;
  //在passport當中可以用
  if (req.user.isStudent()) {
    return res.status(400).send("only instructor can post.");
  }

  let newCourse = new Course({
    title,
    description,
    price
  });

  try {
    await newCourse.save();
    res.status(200).send("new course has been saved.");
  } catch (err) {
    res.status(400).send("cannot save course.");
  }
});

module.exports = router;
