import Head from "next/head";
import Link from "next/link";
import axios from "lib/axios";
import useAuth from "hooks/useAuth";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Axios } from "axios";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "components/Navbar/Navbar";
import styles from "styles/index.module.scss";
import Modal from "components/Modal/Modal";
import Card from "components/Card/Card";
import Post from "lib/helpers/Post";
import useConvert from "hooks/useConvert";
import { mutate } from "swr";
export default function Home() {
  const { logout, isLoading, user,currentUser,authUser } = useAuth({
    middleware: "auth",
  });
  const {convertToHumanReadable} = useConvert();
  
  const {getAllPost,post,storePost}=Post();

  const [createdAt, setCreatedAt] = useState("");
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
    console.log("clicked");
  };  


  const created = () => {
    axios.get("current-user").then((response) => {
      JSON.stringify(response.data);
      setCreatedAt(response.data.created_at);
    });
    return <div>{createdAt}</div>;
  };
  

  const logoutUser = async (event) => {
    event.preventDefault();
    logout();
  };

  useEffect(() => {
    currentUser();
  }, []);

  
  return (
    <>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.main}>
          <h1>LoggedIN as {authUser}</h1>
          <h1>Created at</h1>
          {created()}
          <div>
            logout <button onClick={logoutUser}>logout</button>
          </div>
        </div>
        <input type="button" value="open modal" onClick={handleModal} />
      </div>

      <Modal
        className={`${modal ? styles.modal : styles.hide} ${styles.modals}`}
        message={modal ? "modal is open" : "modal is closed"}
        submitForm={storePost}
        inputs={[{ type: "text", name: "post", placeholder: "post" }]}
      />
      <div
        className={styles.posts}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {post.posts &&
          post.posts.map((post, index) => {
            return <div key={index} className={styles.posts}>
              <Card
              text={post.post}
              author={post.users.name}
              created_at={(post.created_at)}
              username={post.users.email}
              />  
            </div>;
          })}
      </div>
          {/* {console.log(post.user.name)} */}
          
    </>
  );
}
