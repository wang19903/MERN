const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;

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
app.use("/api/user", authRoute); //加 /api 與react區別

app.listen(8080, () => {
  console.log("Server running on port 8080");
}); //react預設的PORT在3000，因為server跟client 會同時跑，所以port不能一樣
