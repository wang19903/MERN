import React from "react";
import { Route, Routes } from "react-router"; //switch=>v5 routes=>v6 寫法改了
import HomeComponet from "./componets/home-componet";
import NavComponet from "./componets/nav-componet";
import RegisterComponet from "./componets/register-componet";

function App() {
  return (
    <div>
      <NavComponet />
      <Routes>
        {/* 5版switch裡的route 加上exact才會顯現指定的元件內容 6版不用 */}
        <Route path="/" element={<HomeComponet />} />
        <Route path="/register" element={<RegisterComponet />} />
      </Routes>
    </div>
  );
}

export default App;
