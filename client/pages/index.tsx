import Head from "next/head";
import Link from "next/link";
import axios from "lib/axios";
import useAuth from "hooks/useAuth";
import { current } from "@reduxjs/toolkit";
import { useEffect, useState,createContext } from "react";
import { Axios } from "axios";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "components/Navbar/Navbar";
import styles from "styles/index.module.scss";
// import Modal from "components/Modal/Modal";
import Card0 from "components/Card/Card0";
import Post from "lib/helpers/Post";
import { useAuthStore } from "store/AuthStore";
import Button from "@/components/Button/Button";
// import headlessui
import { Disclosure } from "@headlessui/react";
import Modal0 from "@/components/Modal/Modal0";
import useSWR from "swr";
import { log } from "lib/log";
interface Post {
  id?: number;
  post?: string;
  created_at?:string;
  user?: {
    id: number;
    username: string;
  };
}


export default function Home() {
  const { logout, isLoading, user,authUser } = useAuth({
    middleware: "auth",
  });
  const { storePost } = Post();
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_BACKEND_URL + "/posts", fetcher, {
    refreshInterval: 1000, // 1 second
});
  // let posts = data
  const [createdAt, setCreatedAt] = useState<string | null>("");
  const [modal, setModal] = useState<boolean>(false);
  log(data, 'p', error)
  log('u', user)

  const created = () => {
    axios.get("current-user").then((response) => {
      JSON.stringify(response.data);
      setCreatedAt(response.data.created_at);
    });
    return <div>{createdAt}</div>;
  };
  

  const logoutUser = async (event) => {
    event.preventDefault();
    log("logout");
    logout();
  };
    
  const token = useAuthStore((state) => state.token);
  // const tU=useAuthStore((state) => state.users.user.name);
  console.warn(token);
  
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* <NavBar /> */}
      <div className="
      
      ">
      <div className={styles.wrapper}>
        <div>
          {/* <SideBar /> */}
        </div>
         {/* @ts-ignore */}
        {authUser?.email_verified_at ? (
          <div className='bg-green-100 mt-10'>
            verify your email
            </div>
        ):(
         ""
        )}

        <div className='main flex flex-row justify-center gap-6'>
            <h1>LoggedIN as   

              <span className='text-blue-500'>
                {token}
              </span>
          </h1>
          <h1>Created at</h1>
          {created()}
          <div>
           <Button onClick={logoutUser} >logout</Button>
          </div>
        </div>
    
      </div>
      <div className='post flex flex-row justify-center gap-6 mb-6'>
          <Modal0
          Submit={storePost}
        />
      </div>
    
      <div
        className={styles.posts}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          {data?.posts?.map((post:any, index:number) => {
            return (
              <div key={index} className='flex flex-row justify-center gap-6 mb-6'>
                <Card0
                  id={post.id}
                  text={post.post}
                  user={post.users.name}
                />
              </div>
            );
          })}
      </div>
      </div>
      
    </>
  );
}







