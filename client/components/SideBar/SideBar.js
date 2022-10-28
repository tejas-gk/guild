import { useState, useRef } from "react";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Settings, ArrowLeft, ArrowRight, User, Compass } from "react-feather";
export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSideBarBtn, setShowSideBarBtn] = useState(true);

  const router = useRouter();

  const navbarRef = useRef();
  const sidebarRef = useRef();

  function toggleSidebar() {
    setShowSideBar(!showSideBar);
    navbarRef.current.classList.toggle(styles.show__navbar);
    // document.querySelector(styles.navbar).classList.toggle(styles.show__navbar);
    setShowSideBarBtn(!showSideBarBtn);
    // sidebarRef.current.classList.toggle(styles.show_arrow);
    // document.querySelector(styles.right_arrow).classList.remove(styles.show_arrow);
    // document.querySelector(styles.show_right_arrow).classList.toggle(styles.show_arrow);
    sidebarRef.current.classList.toggle(styles.show_right_arrow);
    console.log('clicked')
  }
  return (
    <div>
      <nav className={`${styles.navbar}`} ref={navbarRef}>
        <ul className={styles.navbarNav}>
          <li className={styles.logo}>
            <div className={styles.logoLink} onClick={toggleSidebar}>
              <ArrowRight
                className={`${styles.logoIcon} ${styles.show_arrow} ${styles.show_right_arrow}`}
                ref={sidebarRef}
              />
              <ArrowLeft className={`${styles.logoIcon}  ${styles.show_left_arrow}`} ref={sidebarRef} />
            </div>
          </li>
          <li className={styles.navItem}>
            <Link href="/">
            <a
              className={`${styles.navLink} 
                    ${router.pathname === "/" && styles.active}`}
      
            >
              <Home className={styles.icon} />
              <span className={styles.linkText}>Home</span>
            </a>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/user/profile">
            <a
              className={`${styles.navLink}
                     ${router.pathname === "/user/profile" && styles.active}`}
            >
              <User className={styles.icon} />
              <span className={styles.linkText}>Profile</span>
            </a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink}>
              <Compass className={styles.icon} />
              <span className={styles.linkText}>Discover</span>
            </a>
          </li>

          <li className={styles.navItem}>
            <a className={styles.navLink}>
              <Settings className={styles.icon} />
              <span className={styles.linkText}>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
