const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024
  },
  role: {
    type: String,
    enum: ["student", "instructor"], //開發時還會有ADMIN做管理，做完後要刪除避免被註冊身分
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

//mongoose schema middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
}; //舊密碼與新密碼比較，錯誤回傳err，不然就傳null

module.exports = mongoose.model("User", userSchema);
