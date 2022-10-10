import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";

const CourseComponet = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let { courseData, setCourseData } = useState(null);
  useEffect(() => {
    console.log("useEffect");
    let _id = "";
    if (currentUser) {
      _id = currentUser.user._id;
    }
    courseService
      .get(_id)
      .then((data) => {
        setCourseData(data);
      })
      .catch((err) => {
        console.log("setCourseData err: " + err);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login before seeing your course.</p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-lg"
          >
            Login
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>Hi {currentUser.user.username}</h1>
          <h2>Welcome to instructor page</h2>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1> Hi {currentUser.user.username} </h1>
          <h2>Welcome to instructor page</h2>
        </div>
      )}
    </div>
  );
};

export default CourseComponet;
