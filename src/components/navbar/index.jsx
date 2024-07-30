import React,{useState}
 from "react";
import { NavLink }
 from "react-router-dom";
import styles from "./navbar.module.css";
import logo from '../../assets/images/logo.png'; // مسیر به لوگوی شما


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
;

  const handleActiveLink = ({isActive}
)=>
    isActive ? styles.active : '';

  return (
    <header className={styles.header}
>
      <img src={logo}
 alt="Logo" className={styles.logo}
 />
      <nav className={styles.navbar_container}
>
        <ul className={styles.nav_list}
>
          <li className={styles.nav_item}
>
            <NavLink to="/" className={handleActiveLink}
>خانه</NavLink>
          </li>
          <li className={styles.nav_item}
>
            <NavLink to="/bazar" className={handleActiveLink}
>بازار</NavLink>
          </li>
        </ul>
      </nav>
      <nav className={styles.mobile_navbar_container}
>
        <ul className={styles.mobile_navbar_list}
>
          <li className={styles.mobile_nav_item}
>
            <button className={`${styles.menu_button}
 ${menuOpen ? styles.open : ''}
`}
 onClick={toggleMenu}
>
              <div className={styles.line1}
></div>
              <div className={styles.line2}
></div>
            </button>
          </li>
        </ul>
      </nav>
      <div className={`${styles.expansionMenu}
 ${menuOpen ? styles.open : ''}
`}
>
        <div className={styles.mobile_item_menu_container}
>
          <ul className={styles.mobile_item_menu}
>
            <li className={styles.mobile_menu_item}
>
              <NavLink to="/" className={styles.mobile_menu_item_links}
>
                خانه
              </NavLink>
            </li>
            <li className={styles.mobile_menu_item}
>
              <NavLink to="/bazar" className={styles.mobile_menu_item_links}
>
                بازار
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
;

export default NavBar;
