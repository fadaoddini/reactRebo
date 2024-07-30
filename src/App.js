import React from "react";
import { Routes, Route }
 from "react-router-dom";
import "./assets/css/default.css" 
import Bazar from "./pages/bazar";
import Index from "./pages/index";
import NavBar from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/default.css'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" Component={Index}
 />
        <Route path="/bazar" Component={Bazar}
 />
      </Routes>
    </>
  );
}
;

export default App;
