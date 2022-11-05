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
export default function Home() {
  const { logout, isLoading, user,currentUser,authUser } = useAuth({
    middleware: "auth",
  });
  
  const {getAllPost,posts,storePost}=Post();

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
        <div className='main flex flex-row justify-center gap-6'>
          <h1>LoggedIN as {authUser}</h1>
          <h1>Created at</h1>
          {created()}
          <div>
           <button onClick={logoutUser} className='bg-black text-white p-1 hover:bg-white hover:text-black hover:p-1 hover:outline hover:outline-black hover:outline-2'>logout</button>
          </div>
        </div>
        <input type="button" value="open modal" onClick={handleModal} />
      </div>
      <div className='post flex flex-row justify-center gap-6 mb-6'>
        <form method="POST" onSubmit={storePost}>
          <input type="text" name="post" placeholder="post" className="border border-black rounded" />
          <input type="submit" value="post" className="btn" />
        </form>
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
        {posts.posts &&
          posts.posts.map((post, index) => {
            return <div key={index} className='w-full'>
              <Card
              text={post.post}
              author={post.users.name}
              created_at='12hrs ago'
              username={post.users.email}
              id={post.id}
              /> 
            </div>;
          })}
      </div>
          
    </>
  );
}




