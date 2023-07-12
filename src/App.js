import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Start from "./components/Start";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/start" element={<Start />}></Route>
      </Routes>
    </>
  );
}

export default App;
