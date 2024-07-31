import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/css/default.css";
import Bazar from "./pages/bazar";
import Index from "./pages/index";
import Divar from "./pages/divar";
import Profile from "./pages/profile";
import Frig from "./pages/frig";
import Blog from "./pages/blog";
import Learn from "./pages/learn";
import Shop from "./pages/shop";
import Login from "./pages/login";
import Law from "./pages/law";
import Faq from "./pages/faq"
import Transport from "./pages/transport";
import NavBar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/default.css";



const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/bazar" Component={Bazar} />
        <Route path="/divar" Component={Divar} />
        <Route path="/profile" Component={Profile} />
        <Route path="/frig" Component={Frig} />
        <Route path="/shop" Component={Shop} />
        <Route path="/transport" Component={Transport} />
        <Route path="/blog" Component={Blog} />
        <Route path="/learn" Component={Learn} />
        <Route path="/login" Component={Login} />
        <Route path="/law" Component={Law} />
        <Route path="/faq" Component={Faq} />

      </Routes>
    </>
  );
};
export default App;
