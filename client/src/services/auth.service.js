//將資料送到自己的伺服器
import axios from "axios";

const port = 8081;
const API_URL = "http://localhost:" + port + "/api/user";

class AuthService {
  login() {}
  logout() {}
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role
    });
  }
  getCurrentUser() {}
}

//直接new成物件Promise
export default new AuthService();
