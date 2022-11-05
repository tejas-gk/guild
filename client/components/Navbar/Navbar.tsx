import { useState, useRef, useEffect, useReducer } from "react";
import styles from "components/Navbar/navbar.module.scss";
import Link from "next/link";
import { Circle, ArrowDown, Sun, Moon } from "react-feather";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const toggle = () => {
    setOpen(!open);
  };

  const handleClickOutside = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const handleChangeMode = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      lightModeRef.current.style.display = "none";
      darkModeRef.current.style.display = "block";
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      darkModeRef.current.style.display = "none";
      darkModeRef.current.style.outline = "2px solid #fff";
      lightModeRef.current.style.display = "block";
      lightModeRef.current.style.outline = "2px solid #fff";
      document.body.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  };

  const dropdown = useRef(null);
  const lightModeRef = useRef(null);
  const darkModeRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    lightModeRef.current.style.outline = "2px solid #fff";
    lightModeRef.current.style.display = "none";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      lightModeRef.current.style.display = "none";
      darkModeRef.current.style.display = "block";
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      darkModeRef.current.style.display = "none";
      darkModeRef.current.style.outline = "2px solid #fff";
      lightModeRef.current.style.display = "block";
      lightModeRef.current.style.outline = "2px solid #fff";
      document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '/') {
        e.preventDefault();
        document.getElementById('search').focus();
        console.log('focus on input');
      }
    }
    )
  },[]);
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <Circle />
        </div>
        <div className={styles.nav__search__bar} id='search'>
          <input type="search" placeholder="Search" />
        </div>
        <ul className={styles.navbar__logo__list}>
          <li className={styles.navbar__logo__list__item}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navbar__logo__list__item}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li className={styles.navbar__logo__list__item}>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>

          <ul className={styles.navbar__logo__list__item__right}>
            <li className={styles.navbar__logo__list__item}>
              <div
                className={`${styles.mode}  ${styles.light_mode}`}
                onClick={handleChangeMode}
                ref={lightModeRef}
              >
                <Sun />
              </div>
            </li>

            <li className={styles.navbar__logo__list__item}>
              <div
                className={`${styles.mode} ${styles.dark_mode}`}
                onClick={handleChangeMode}
                ref={darkModeRef}
              >
                <Moon />
              </div>
            </li>

            <li
              className={styles.navbar__logo__list__item}
              onClick={toggle}
              ref={dropdown}
            >
              <ArrowDown />
            </li>
          </ul>
        </ul>
      </div>
      {open && (
        <div className={styles.navbar__logo__list__dropdown}>
          <ul>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
