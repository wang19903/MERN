import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.service";

const CourseComponet = (props) => {
  const navigate = useNavigate();
  let { currentUser, setCurrentUser } = props;
  let [courseData, setCourseData] = useState(null);
  let [editMode, setEditMode] = useState(false);
  let [editId, setEditId] = useState(1);
  let [message, setMessage] = useState("");
  let [title, setTitle] = useState("3");
  let [description, setDescription] = useState("4");
  let [price, setPrice] = useState(0);
  const ref = useRef(null);

  const handleChangeTitle = (e) => {
    console.log(ref.current.value);
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleEditMode = (e) => {
    // setTitle(data.data.title);
    // setDescription(e.target.value);
    // setPrice(e.target.value);
    let buf = !editMode;
    let a = e.currentTarget.id;

    console.log(a);
    setEditMode(buf);
    setEditId(a); ///??
    console.log(editId);
    console.log("after", editMode, editId);
    let Data = {};
    courseService
      .getOneCourse(a)
      .then((data) => {
        Data = data.data;
        //console.log(Data);
      })
      .catch((err) => {
        console.log("setCourseData err: " + err);
      });

    console.log("123 " + title);
  };

  const updateCourse = () => {
    // courseService
    //   .update(title, description, price, editId)
    //   .then(() => {
    //     window.alert("New course has been created.");
    //     setMessage("");
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //     setMessage(error.response.data);
    //   });
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
  });

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

          {courseData.map((course) => (
            <div className="card" style={{ width: "18rem" }} key={course._id}>
              {editMode === false && (
                <div>
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
                      edit
                    </button>
                  </div>
                </div>
              )}
              {editMode === true && editId === course._id && (
                <div>
                  <div className="card-body">
                    <h5 className="card-title">Title:</h5>
                    <label htmlFor="title"></label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={course.title}
                      ref={ref}
                      onChange={handleChangeTitle}
                    />
                    <p className="card-text">
                      Description:
                      <label htmlFor="description"></label>
                      <textarea
                        name="description"
                        aria-describedby="emailHelp"
                        defaultValue={course.description}
                        onChange={handleChangeDesciption}
                      />
                    </p>
                    <p>Student Count: {course.students.length}</p>
                    <p className="card-text">
                      <label htmlFor="price"></label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={course.price}
                        onChange={handleChangePrice}
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
                      <button
                        onClick={updateCourse}
                        className="btn btn-primary"
                      >
                        done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseComponet;
