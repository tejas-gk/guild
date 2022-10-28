import axios from "lib/axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { mutate } from "swr";
export default function Post() {
  const [posts, setPosts] = useState("");
  const router = useRouter();
  const getAllPost = () => {
    axios.get("/posts").then((response) => {
      setPosts(response.data);
    });
  };

  const storePost = async (e) => {
    e.preventDefault();
          const formData = new FormData(e.target);
          const data = {
            post: formData.get("post"),
          };
          await axios.post("/post", data);
          mutate("/post");
  };

  const getAParticularPost:any = async (id) => {
    axios.get("/post/1").then((response) => {
      setPosts(response.data);
    });
  };

 const deletePost = async (id) => {
  axios.delete(`/delete-post/${id}`).then((response) => {
    mutate("/delete-post");
    console.log(response.data);
  });
}
  useEffect(() => {
    getAllPost();
  }, []);

  return {
    getAllPost,
    posts,
    storePost,
    getAParticularPost,
    deletePost,
  };
}
