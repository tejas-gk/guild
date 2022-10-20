import Head from "next/head";
import Link from "next/link";
import axios from "lib/axios";
import useAuth from "hooks/useAuth";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Axios } from "axios";
import SideBar from "components/SideBar/SideBar";
import NavBar from "components/Navbar/Navbar";
import styles from "styles/index.module.scss";
import Modal from "components/Modal/Modal";
import { mutate } from "swr";
import { redirect } from "next/dist/server/api-utils";
// import Post from 'lib/helpers/Post'
export default function Home() {
  const { logout, isLoading, user, storePost } = useAuth({
    middleware: "auth",
  });
  // const {storePost,getAllPost,post}=Post();

  const [authUser, setAuthUser] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
    console.log("clicked");
  };

  const currentUser = () => {
    axios.get("current-user").then((response) => {
      JSON.stringify(response.data);
      setAuthUser(response.data.name);
      console.log(response.data);
    });
  };
  const convertDate = (date) => {
    const newDate = new Date(date);
    const dateStr = newDate.toString();
    const dateArr = dateStr.split(" ");
    const newDateArr = dateArr.slice(0, 5);
    const newDateStr = newDateArr.join(" ");
    setCreatedAt(newDateStr);
  };

  const created = () => {
    axios.get("current-user").then((response) => {
      JSON.stringify(response.data);
      setCreatedAt(response.data.created_at);
    });
    return <div>{createdAt}</div>;
  };
  const [post, setPost] = useState("");

  const getAllPost = () => {
    axios.get("/post").then((response) => {
      setPost(response.data);
    });
  };
  useEffect(() => {
    getAllPost();
  }, []);

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
        inputs={[{ type: "text", name: "post", placeholder: "post" }]}
        buttons={[
          {
            text: "submit",
            type: "submit",
            onClick: () => console.log("submit"),
          },
        ]}
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
            return <div key={index}>{post.post}</div>;
          })}
      </div>

      <form
        method="POST"
        style={{
          position: "absolute",
          top: "400px",
          left: "700px",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = {
            post: formData.get("post"),
          };
          await axios.post("/post", data);
          mutate("/post");
        }}
      >
        <input type="text" name="post" placeholder="post" />
        <input type="submit" value="submit" />
      </form>
      {console.log(post)}
    </>
  );
}
