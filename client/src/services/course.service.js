//將資料送到自己的伺服器
import axios from "axios";

const port = 8081;
const API_URL = "http://localhost:" + port + "/api";

class CourseService {
  post(title, description, price) {
    let token_buf = "";
    let token = "";
    if (localStorage.getItem("user")) {
      token_buf = JSON.parse(localStorage.getItem("user")).token;
      token = token_buf.slice(0, 3) + " " + token_buf.slice(3);
    }
    // txt.slice(1, 4) + " " + txt.slice(5, -1)
    console.log("check token: " + token);
    return axios.post(
      API_URL + "/courses",
      {
        title,
        description,
        price
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
  }

  get(_instructor_id) {
    let token = "";
    if (localStorage.getItem("user")) {
      console.log(
        "check token: " + JSON.parse(localStorage.getItem("user")).token
      );
      token = JSON.parse(localStorage.getItem("user")).token;
    }
    return axios.post(API_URL + "/instructor/" + _instructor_id, {
      headers: {
        Authorization: token
      }
    });
  }
}

//直接new成物件Promise
export default new CourseService();
