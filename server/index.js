const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
//cors可以同時開啟兩個port 要安裝在server端
const cors = require("cors");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //cors要放在Router上面
app.use("/api/user", authRoute); //加 /api 與react區別
app.use(
  "/api/courses",
  //取得TOKEN後，JWT後面要空格，才讀的到JWT這個字串
  passport.authenticate("jwt", { session: false }),
  courseRoute
);
const port = 8081;
app.listen(8081, () => {
  console.log("Server running on port " + port);
}); //react預設的PORT在3000，因為server跟client 會同時跑，所以port不能一樣
