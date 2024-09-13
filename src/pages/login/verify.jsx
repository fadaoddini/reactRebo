import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./verify.module.css";
import Config from "../../config/config";
import logo from "../../assets/images/logo.png";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mobile } = location.state || {};

  const [code, setCode] = useState(["", "", "", ""]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [timeLeft, setTimeLeft] = useState(120); // 2 دقیقه معادل 120 ثانیه

  useEffect(() => {
    if (mobile) {
      sessionStorage.setItem("mobile", mobile);
    }

    const checkToken = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        navigate("/"); // هدایت به صفحه اصلی اگر توکن وجود دارد
        return true;
      }
      return false;
    };

    if (checkToken()) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate("/login"); // هدایت به صفحه ورود زمانی که زمان تمام شد
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, mobile]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 3 && value) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode.length !== 4) {
      setToast({ message: "لطفاً کد ۴ رقمی را وارد کنید.", type: "error" });
      return;
    }
  
    try {
      const response = await axios.post(
        `${Config.baseUrl}/login/verifyCode`,
        { mobile, code: enteredCode },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const { status, messege, access_token, refresh_token, user_id } = response.data;
  
      if (status === "ok") {
        // ذخیره توکن‌ها در sessionStorage
        sessionStorage.setItem("accessToken", access_token);
        sessionStorage.setItem("refreshToken", refresh_token);
  
        console.log("Access Token:", access_token); // توکن دسترسی
        console.log("Refresh Token:", refresh_token); // توکن تازه‌سازی
        console.log("User ID:", user_id); // شناسه کاربر
  
        navigate("/"); // هدایت به صفحه اصلی
      } else {
        setToast({ message: messege || "کد تأیید نادرست است.", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({
        message: "خطایی رخ داده است، لطفاً دوباره تلاش کنید.",
        type: "error",
      });
    }
  };
  
  return (
    <div className={styles.verify_wrapper}>
      <div className={styles.verify_container}>
        <img src={logo} alt="rebo" className={styles.logo} />
        <h1>تأیید</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.code_container}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                className={styles.code_input}
              />
            ))}
          </div>
          <button type="submit">تأیید</button>
        </form>
        <div className={styles.timer}>
          {`زمان باقی‌مانده: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
            .toString()
            .padStart(2, "0")}`}
        </div>
        {toast.message && (
          <div
            className={`${styles.toast} ${
              toast.type === "error" ? styles.error : styles.success
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
