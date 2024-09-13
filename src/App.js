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
import Cart from "./pages/cart/Cart";
import FinalInvoice from "./pages/cart/FinalInvoice";
import Review from "./pages/cart/Review";
import Address from "./pages/cart/Address";
import { CartProvider } from "./pages/cart/CartContext";
import { AddToCartProvider } from "./components/AddToCart/AddToCartContext";
import { BidProvider } from "./pages/bazar/BidContext"; // وارد کردن BidProvider
import PaymentRedirectHandler from "./components/payment/PaymentRedirectHandler";
import PaymentRedirectHandlerBid from "./components/payment/PaymentRedirectHandlerBid";
import PaymentRedirectHandlerTransport from "./components/payment/PaymentRedirectHandlerTransport";

const App = () => {
  const location = useLocation();

  // مسیرهایی که NavBar نباید در آن‌ها نمایش داده شود
  const hideNavBarPaths = ["/login", "/verify"];

  // بررسی اینکه آیا مسیر فعلی در لیست مسیرهای مخفی قرار دارد یا خیر
  const hideNavBar = hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <CartProvider>
        <AddToCartProvider>
          <BidProvider>
            <Routes>
              <Route path="/chart/report/:id" element={<ChartComponent />} />
              <Route path="/" element={<Index />} />

              <Route path="/bazar" element={<Bazar />} />
              <Route path="/divar" element={<Divar />} />
              <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route path="/frig" element={<Frig />} />
              <Route path="/payment/verify/" element={<PaymentRedirectHandler />} />
              <Route path="/payment/bid/verify/" element={<PaymentRedirectHandlerBid />} />
              <Route path="/payment/transport/verify/" element={<PaymentRedirectHandlerTransport />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/learn" element={<Learn />} />

              <Route
                path="/login"
                element={
                  <RedirectRoute
                    element={<Login />}
                    redirectTo="/"
                    requiresAuth={false}
                  />
                }
              />
              <Route
                path="/verify"
                element={
                  <RedirectRoute
                    element={<Verify />}
                    redirectTo="/"
                    requiresAuth={false}
                  />
                }
              />
              <Route path="/shop" element={<Shop />} />
              <Route path="/law" element={<Law />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<Address />} />
              <Route path="/review" element={<Review />} />
              <Route path="/finalInvoice" element={<FinalInvoice />} />
            </Routes>
          </BidProvider>
        </AddToCartProvider>
      </CartProvider>
    </>
  );
};

export default App;
