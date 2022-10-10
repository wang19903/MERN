import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //6版把useHistory改成useNavigate
import AuthService from "../services/auth.service";

const RegisterComponet = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    //呼叫auth.service的AuthService
    console.log("register !");
    AuthService.register(username, email, password, role)
      .then(() => {
        setMessage("");
        window.alert(
          "Registration succeeds. You are now redirected to the login page."
        );
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.response);
        setMessage(e.response.data);
      });
  };

  //   const test = () => {
  //     console.log("test" + username + email + password + role);
  //   };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div>
          {message && <div className="alert alert-danger">{message}</div>}
          {/*for在react是保留字，改成htmlFor*/}
          <label htmlFor="username">Username</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">role</label>
          <input
            onChange={handleChangeRole}
            type="text"
            className="form-control"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponet;
