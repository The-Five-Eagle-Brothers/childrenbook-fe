import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Start from "./components/Start";
import LittlePrince from "./components/LittlePrince";
import RabbitAndTurtle from "./components/RabbitAndTurtle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/" element={<Start />}></Route>
        <Route path="/littlePrince" element={<LittlePrince />}></Route>
        <Route path="/rabbitAndTurtle" element={<RabbitAndTurtle />}></Route>
      </Routes>
    </>
  );
}

export default App;
