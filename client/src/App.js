import React, { useState } from "react";
import { Route, Routes } from "react-router"; //switch=>v5 routes=>v6 寫法改了
import HomeComponet from "./componets/home-componet";
import NavComponent from "./componets/nav-componet";
import RegisterComponet from "./componets/register-componet";
import LoginComponent from "./componets/login-componet";
import ProfileComponet from "./componets/profile-componet";
import AuthService from "./services/auth.service";
import CourseComponet from "./componets/course-componet";
import PostCourseComponet from "./componets/postCourse-componet";
function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        {/* 5版switch裡的route 加上exact才會顯現指定的元件內容 6版不用 */}
        <Route path="/" element={<HomeComponet />} />
        <Route path="/register" element={<RegisterComponet />} />
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileComponet
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/course"
          element={
            <CourseComponet
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/postCourse"
          element={
            <PostCourseComponet
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
