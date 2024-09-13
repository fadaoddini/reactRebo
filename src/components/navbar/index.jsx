import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/utils/ConfirmDialog";
import styles from "./navbar.module.css";
import logo from "../../assets/images/logo.png";
import question from "../../assets/images/question.png";
import exit from "../../assets/images/exit.png";
import profile from "../../assets/images/profile.png";
import cart from "../../assets/images/cart.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [iconSrc, setIconSrc] = useState({
    exit: exit,
    profile: profile,
    question: question,
    cart: cart,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleActiveLink = ({ isActive }) => (isActive ? styles.active : "");

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setIsDialogOpen(false);
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setIsDialogOpen(false);
  };

  const handleMouseEnter = (icon) => {
    setIconSrc((prevState) => ({
      ...prevState,
      [icon]: require(`../../assets/images/${icon}_hover.png`),
    }));
  };

  const handleMouseLeave = (icon) => {
    setIconSrc((prevState) => ({
      ...prevState,
      [icon]: require(`../../assets/images/${icon}.png`),
    }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar_wrapper}>
        <nav className={styles.navbar_container}>
          <img src={logo} alt="ربو| بورس خرما" className={styles.logo} />
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
              <NavLink to="/" className={handleActiveLink}>
                خانه
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink to="/bazar" className={handleActiveLink}>
                بازار عمده
              </NavLink>
            </li>
            {/* <li className={styles.nav_item}>
              <NavLink to="/divar" className={handleActiveLink}>
                دیوار
              </NavLink>
            </li>
           
            <li className={styles.nav_item}>
              <NavLink to="/frig" className={handleActiveLink}>
                سردخانه
              </NavLink>
            </li> */}
            <li className={styles.nav_item}>
              <NavLink to="/transport" className={handleActiveLink}>
                حمل و نقل
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink to="/shop" className={handleActiveLink}>
                 فروشگاه من
              </NavLink>
            </li>
            {/* <li className={styles.nav_item}>
              <NavLink to="/learn" className={handleActiveLink}>
                آموزش
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink to="/blog" className={handleActiveLink}>
                وبلاگ
              </NavLink>
            </li> */}
            <li className={styles.nav_item}>
              <NavLink to="/law" className={handleActiveLink}>
                قوانین
              </NavLink>
            </li>
          </ul>

          <div className={styles.left_menu}>
            {isLoggedIn && (
              <div className={styles.tooltip_container}>
                <img
                  src={iconSrc.exit}
                  alt="خروج"
                  className={styles.icon}
                  onClick={handleLogoutClick}
                  onMouseEnter={() => handleMouseEnter("exit")}
                  onMouseLeave={() => handleMouseLeave("exit")}
                  style={{ cursor: "pointer" }}
                />
                <div className={styles.tooltip}>خروج</div>
              </div>
            )}

            <div className={styles.tooltip_container}>
              <NavLink to="/profile">
                <img
                  src={iconSrc.profile}
                  alt="پروفایل"
                  className={styles.icon}
                  onMouseEnter={() => handleMouseEnter("profile")}
                  onMouseLeave={() => handleMouseLeave("profile")}
                />
                <div className={styles.tooltip}>پروفایل</div>
              </NavLink>
            </div>

            <div className={styles.tooltip_container}>
              <NavLink to="/faq">
                <img
                  src={iconSrc.question}
                  alt="سوالات متداول"
                  className={styles.icon}
                  onMouseEnter={() => handleMouseEnter("question")}
                  onMouseLeave={() => handleMouseLeave("question")}
                />
                <div className={styles.tooltip}>سوالات متداول</div>
              </NavLink>
            </div>
            <div className={styles.tooltip_container}>
              <NavLink to="/cart">
                <img
                  src={iconSrc.cart}
                  alt="سبد خرید"
                  className={styles.icon}
                  onMouseEnter={() => handleMouseEnter("cart")}
                  onMouseLeave={() => handleMouseLeave("cart")}
                />
                <div className={styles.tooltip}>سبد خرید </div>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      <nav className={styles.mobile_navbar_container}>
        <button
          className={`${styles.menu_button} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
        </button>
      </nav>

      <div className={`${styles.expansionMenu} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.mobile_item_menu}>
          <li className={styles.mobile_menu_item}>
            <NavLink to="/" className={styles.mobile_menu_item_links}>
              خانه
            </NavLink>
          </li>
          <li className={styles.nav_item}>
              <NavLink to="/bazar" className={handleActiveLink}>
                بازار عمده
              </NavLink>
          </li>
          <li className={styles.nav_item}>
              <NavLink to="/transport" className={handleActiveLink}>
                حمل و نقل
              </NavLink>
          </li>
          <li className={styles.nav_item}>
              <NavLink to="/law" className={handleActiveLink}>
                قوانین
              </NavLink>
            </li>
          {/* سایر آیتم‌های موبایل */}
          {isLoggedIn && (
            <li className={styles.mobile_menu_item}>
              <button
                className={`${styles.mobile_menu_item_links} ${styles.logout_button_red}`}
                onClick={handleLogoutClick}
              >
                <span>خروج</span>
              </button>
            </li>
          )}
        </ul>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        message="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        confirmText="بله"
        cancelText="خیر"
      />
    </header>
  );
};

export default NavBar;
