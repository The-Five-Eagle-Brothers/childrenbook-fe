import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Start from "./components/Start";
import LittlePrince from "./components/LittlePrince";
import RabbitAndTurtle from "./components/RabbitAndTurtle";
import VideoIntro from "./components/VideoIntro";
import Redirection from "./components/Redirection";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Start />} />
        <Route path="/littlePrince" element={<LittlePrince />} />
        <Route path="/rabbitAndTurtle" element={<RabbitAndTurtle />} />
        <Route path="/rabbitAndTurtleIntro" element={<VideoIntro />} />
        <Route exact path="/kakao/callback" element={<Redirection />} />
      </Routes>
    </>
  );
}

export default App;
