const e = require("express");

const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../vaildation").courseValidation;

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

router.get("/", (req, res) => {
  Course.find({})
    //populate將ref綁定的資料一起帶出，沒+populate只會有導師ID，加入後出現老師[姓名、信箱]
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      console.log("get course: " + err);
      res.status(500).send("cant get course");
    });
});

router.get("/instructor/:_instructor_id", (req, res) => {
  let { _instructor_id } = req.params;
  Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      console.log("get courses33: " + err);
      res.status(500).send("cant get courses");
    });
});

router.get("/findByName/:name", (req, res) => {
  let { name } = req.params;
  Course.find({ title: name })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.status(200).send(course);
    })
    .catch((err) => {
      console.log("get courses33: " + err);
      res.status(500).send(err);
    });
});

router.get("/student/:_student_id", (req, res) => {
  let { _student_id } = req.params;
  Course.find({ students: _student_id })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      console.log("get courses46: " + err);
      res.status(500).send("cant get courses");
    });
});

router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      console.log("get a course: " + err);
      res.status(500).send("cant get a course");
    });
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
    price,
    instructor: req.user._id
  });

  try {
    await newCourse.save();
    res.status(200).send("new course has been saved.");
  } catch (err) {
    res.status(400).send("cannot save course.");
  }
});

router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  let { _student_id } = req.body;
  console.log("bb", _id, _student_id);
  try {
    let course = await Course.findOne({ _id });
    course.students.push(_student_id);
    await course.save();
    res.send("Done Enroll");
  } catch (err) {
    res.send(err);
  }
});

router.patch("/:_id", async (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(400);
    return res.json({
      succsee: false,
      message: "course not found."
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true
    })
      .then(() => {
        res.send("Course updated.");
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err
        });
      });
  } else {
    res.status(403);
    return res.json({
      succsee: false,
      message: "only instructor or admin can edit this course."
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(400);
    return res.json({
      succsee: false,
      message: "course not found."
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.deleteOne({ _id })
      .then(() => {
        res.send("Course deleted.");
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err
        });
      });
  } else {
    res.status(403);
    return res.json({
      succsee: false,
      message: "only instructor or admin can delete this course."
    });
  }
});

module.exports = router;
