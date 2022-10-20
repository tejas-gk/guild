import { useState, useRef } from "react";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Settings, ArrowLeft, ArrowRight, User } from "react-feather";
export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSideBarBtn, setShowSideBarBtn] = useState(true);

  const router = useRouter();

  const navbarRef = useRef(null);
  const sidebarRef = useRef(null);

  function toggleSidebar() {
    setShowSideBar(!showSideBar);
    navbarRef.current.classList.toggle(styles.navbar);
    setShowSideBarBtn(!showSideBarBtn);
    sidebarRef.current.classList.toggle(styles.show_arrow);
  }
  return (
    <div>
      <nav className={styles.navbar} ref={navbarRef}>
        <ul className={styles.navbarNav}>
          <li className={styles.logo}>
            <div className={styles.logoLink} onClick={toggleSidebar}>
              <ArrowRight
                className={`${styles.logoIcon} ${styles.show_arrow}`}
                ref={sidebarRef}
              />
              <ArrowLeft className={`${styles.logoIcon}`} ref={sidebarRef} />
            </div>
          </li>
          <li className={styles.navItem}>
            <a
              className={`${styles.navLink} 
                    ${router.pathname === "/" && styles.active}`}
              href="/"
            >
              <Home className={styles.icon} />
              <span className={styles.linkText}>Home</span>
            </a>
          </li>

          <li className={styles.navItem}>
            <a
              href="user/profile"
              className={`${styles.navLink}
                     ${router.pathname === "/user/profile" && styles.active}`}
            >
              <User className={styles.icon} />
              <span className={styles.linkText}>Profile</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink}>
              <Home className={styles.icon} />
              <span className={styles.linkText}>Home</span>
            </a>
          </li>

          <li className={styles.navItem}>
            <a className={styles.navLink}>
              <Settings className={styles.icon} />
              <span className={styles.linkText}>Home</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
