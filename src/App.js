import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Start from "./components/Start";
import LittlePrince from "./components/LittlePrince";
import RabbitAndTurtle from "./components/RabbitAndTurtle";
import VideoIntro from "./components/VideoIntro";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/" element={<Start />}></Route>
        <Route path="/littlePrince" element={<LittlePrince />}></Route>
        <Route path="/rabbitAndTurtle" element={<RabbitAndTurtle />}></Route>
        <Route path="/rabbitAndTurtleIntro" element={<VideoIntro />}></Route>
      </Routes>
    </>
  );
}

export default App;
