import axios from "lib/axios";
import { redirect } from "next/dist/server/api-utils";
import { NextRouter, useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { numberOrString } from "@/setup/types/CommonType";
export default function Post() {
  const [posts, setPosts] = useState<string>("");
  const router:NextRouter = useRouter();

  const { data: user, error, mutate } = useSWR("/user", () =>
    axios.get("/user").then((response) => response.data.data)
  );

  const getAllPost = () => {
    let timeTakenToFetch:numberOrString;

    axios.get("/posts").then((response) => {
      setPosts(response.data);
      timeTakenToFetch = response.headers["x-response-time"];
    });
    console.log("timeTakenToFetch", timeTakenToFetch);
  };


  const storePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      post: formData.get("post"),
    };
    await axios.post("/post", data);
    mutate("/post");
    refreshData();
    console.log("data", data);
  };
  
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const getAParticularPost:any = async (id) => {
    axios.get("/post/1").then((response) => {
      setPosts(response.data);
    });
  };

 const deletePost = async (id:numberOrString) => {
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
