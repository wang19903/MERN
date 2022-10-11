//將資料送到自己的伺服器
import axios from "axios";

const port = 8081;
const API_URL = "http://localhost:" + port + "/api/courses";

class CourseService {
  post(title, description, price) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    console.log("course post: " + this.token);
    return axios.post(
      API_URL + "",
      {
        title,
        description,
        price
      },
      {
        headers: {
          Authorization: this.token
        }
      }
    );
  }

  update(title, description, price, editId) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    console.log("course update: " + this.token);
    return axios.patch(
      API_URL + "/" + editId,
      {
        title,
        description,
        price
      },
      {
        headers: {
          Authorization: this.token
        }
      }
    );
  }

  getEnrolledCourses(_student_id) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    return axios.get(API_URL + "/student/" + _student_id, {
      headers: {
        Authorization: this.token
      }
    });
  }

  getCourseByName(name) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: this.token
      }
    });
  }

  get(_instructor_id) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    // console.log("API=> " + API_URL + "/instructor/" + _instructor_id);
    return axios.get(API_URL + "/instructor/" + _instructor_id, {
      headers: {
        Authorization: this.token
      }
    });
  }

  getOneCourse(_id) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    console.log("API=> " + API_URL + "/" + _id);
    return axios.get(API_URL + "/" + _id, {
      headers: {
        Authorization: this.token
      }
    });
  }

  enroll(_id, _student_id) {
    if (localStorage.getItem("user")) {
      this.token_buf = JSON.parse(localStorage.getItem("user")).token;
      this.token = this.token_buf.slice(0, 3) + " " + this.token_buf.slice(3);
    } else {
      this.token = "";
    }
    console.log(this.token);
    return axios.post(
      API_URL + "/enroll/" + _id,
      {
        _student_id
      },
      {
        headers: {
          Authorization: this.token
        }
      }
    );
  }
}

//直接new成物件Promise
export default new CourseService();
