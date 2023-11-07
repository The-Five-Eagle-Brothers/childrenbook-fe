import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Start from "./components/Start";
import LittlePrince from "./components/LittlePrince";
import RabbitAndTurtle from "./components/RabbitAndTurtle";
import Redirection from "./components/Redirection";
import LittlePrinceIntro from "./components/LittlePrinceIntro";
import OnBoarding from "./components/OnBoarding";
import RabbitAndTurtleIntro from "./components/RabbitAndTurtleIntro";
import LittlePrinceVideo from "./components/LittlePrinceVideo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Start />} />
        <Route path="/onBoarding" element={<OnBoarding />} />
        {/* 토끼와 거북이 */}
        <Route path="/rabbitAndTurtle" element={<RabbitAndTurtle />} />
        <Route
          path="/rabbitAndTurtleIntro"
          element={<RabbitAndTurtleIntro />}
        />
        {/* 어린왕자 */}
        <Route path="/princeRoad" element={<LittlePrince />} />
        <Route path="/princeMain" element={<LittlePrinceIntro />} />
        <Route path="/princeIntro" element={<LittlePrinceVideo />} />
        <Route exact path="/kakao/callback" element={<Redirection />} />
      </Routes>
    </>
  );
}

export default App;
