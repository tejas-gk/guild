import { useState } from "react";
import styles from "styles/profile.module.scss";
import {
  Camera,
  MapPin,
  Briefcase,
  Calendar,
  Gift,
  MoreHorizontal,
} from "react-feather";
import NavBar from "components/NavBar/NavBar";
import SideBar from "components/SideBar/SideBar";
import useAuth from "hooks/useAuth";
export default function profile() {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState("");
  function authUser() {
    // setUserName(currentUser.name)
    return (
      <div>
        <h1>{currentUser.name}</h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.backBtn}></div>
      <NavBar />
      <SideBar />
      <div className={styles.banner}>
        <img
          src="https://images.unsplash.com/photo-1624644128945-920c0da6931b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&"
          alt="banner"
          width={1000}
          height={300}
        />
      </div>
      <div className={styles.profilePhoto}>
        <img src="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
        <span>
          <Camera />
        </span>
      </div>
      <div className={styles.profileInfo}>
        <div style={styles.profileInfoItem}>
          <h2>{authUser()}</h2>
          <p>@username</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <p>
            <Briefcase /> Web Developer
          </p>
          <p>
            <MapPin /> India
          </p>
          <p>
            <Calendar />
            joined on 26th may 2020
          </p>
          <p>
            <Gift /> born on 28th may 2003
          </p>
        </div>
      </div>
      <div className={styles.follow}>
        <p className={styles.moreBtn}>
          <MoreHorizontal />
        </p>
        <button className={styles.followBtn}>follow</button>
      </div>
      <div className={styles.bioWrapper}>
        <div className={styles.bio}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ut!
        </div>
        <div className={styles.stats}>
          following <span>100</span> followers <span>100</span>
        </div>
      </div>
    </div>
  );
}
