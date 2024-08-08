import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RedirectRoute from "./components/RedirectRoute"; // اضافه کردن RedirectRoute
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
import Faq from "./pages/faq";
import Transport from "./pages/transport";
import NavBar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import ChartComponent from "./components/chart/ChartComponent";
import Verify from "./pages/login/verify";

const App = () => {
  const location = useLocation();

  // مسیرهایی که NavBar نباید در آن‌ها نمایش داده شود
  const hideNavBarPaths = ["/login", "/verify"];

  // بررسی اینکه آیا مسیر فعلی در لیست مسیرهای مخفی قرار دارد یا خیر
  const hideNavBar = hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/chart/report/:id" element={<ChartComponent />} />
        <Route path="/" element={<Index />} />
        <Route path="/bazar" element={<PrivateRoute element={<Bazar />} />} />
        <Route path="/divar" element={<Divar />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/frig" element={<Frig />} />
        <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<RedirectRoute element={<Login />} />} />
        <Route path="/verify" element={<RedirectRoute element={<Verify />} />} />
        <Route path="/law" element={<Law />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </>
  );
};

export default App;
