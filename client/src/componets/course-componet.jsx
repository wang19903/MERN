import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";

const CourseComponet = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [courseData, setCourseData] = useState(null);
  let [editMode, setEditMode] = useState({ mode: false, id: "" });

  const handleEditMode = (e) => {
    let buf = !editMode.mode;
    let a = e.currentTarget.id;
    console.log(e.currentTarget.id);
    setEditMode((editMode) => ({
      ...editMode,
      mode: !editMode.mode,
      id: a
    }));

    console.log(editMode);
  };

  useEffect(() => {
    let _id = "";
    if (currentUser) {
      _id = currentUser.user._id;
    }
    if (currentUser.user.role === "instructor") {
      courseService
        .get(_id)
        .then((data) => {
          //console.log("useEffect: " + JSON.stringify(data));
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log("setCourseData err: " + err);
        });
    } else if (currentUser.user.role === "student") {
      courseService
        .getEnrolledCourses(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log("setCourseData2 err: " + err);
        });
    }
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
          <h2>Welcome to student page</h2>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div>
          <p>Here's the course list</p>
          {editMode.mode === false && (
            <div>
              {courseData.map((course) => (
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  key={course._id}
                >
                  <div className="card-body">
                    <h5 className="card-title">Title: {course.title}</h5>
                    <p className="card-text">
                      Description: {course.description}
                    </p>
                    <p>Student Count: {course.students.length}</p>
                    <p className="card-text">${course.price}</p>
                  </div>

                  <div className="ps-1">
                    <button
                      onClick={handleEditMode}
                      className="btn btn-primary"
                      id={course._id}
                    >
                      edit編輯
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {editMode.mode === true && (
            <div>
              {courseData.map((course) => (
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  key={course._id}
                >
                  <div className="card-body">
                    <h5 className="card-title">Title:</h5>
                    <label htmlFor="title"></label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={course.title}
                    />
                    <p className="card-text">
                      Description:
                      <label htmlFor="description"></label>
                      <input
                        type="text"
                        name="description"
                        defaultValue={course.description}
                      />
                    </p>
                    <p>Student Count: {course.students.length}</p>
                    <p className="card-text">
                      <label htmlFor="price"></label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={course.price}
                      />
                    </p>
                  </div>
                  <div className="ps-1">
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={handleEditMode}
                        className="btn btn-danger"
                        id={course._id}
                      >
                        cancel
                      </button>
                      <button className="btn btn-primary">done</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseComponet;
