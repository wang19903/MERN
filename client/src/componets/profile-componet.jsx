import React, { useEffect } from "react";
import { useState } from "react";
import AuthService from "../services/auth.service";

const ProfileComponet = (props) => {
  console.log(props);
  let { currentUser, setCurrentUser } = props;
  //讓JWT+空格，貼在POSTMAN TOKEN才正確
  let txt = JSON.stringify(currentUser.token);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>You must login first before getting your profile</div>
      )}
      {currentUser && (
        <div>
          <h1>In profile page.</h1>
          <header className="jumpotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Token: {txt.slice(1, 4) + " " + txt.slice(5, -1)}</strong>
          </p>
          <p>
            <strong>ID: {currentUser.user._id}</strong>
          </p>
          <p>
            <strong>email: {currentUser.user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponet;
