import React from "react";

const ProfileComponet = (props) => {
  console.log(props);
  let { currentUser, setCurrentUser } = props;
  //讓JWT+空格，貼在POSTMAN TOKEN才正確
  let txt = JSON.stringify(currentUser.token);
  txt = txt.slice(1, 4) + " " + txt.slice(5, -1);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>You must login first before getting your profile</div>
      )}
      {currentUser && (
        <div>
          <h1>In profile page.</h1>
          <header>
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong style={{ wordBreak: "break-all" }}>Token: {txt}</strong>
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
