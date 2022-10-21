import axios from "lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mutate } from "swr";
export default function Post() {
  const [post, setPost] = useState("");

  const getAllPost = () => {
    axios.get("/post").then((response) => {
      setPost(response.data);
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
  useEffect(() => {
    getAllPost();
  }, []);

  return {
    getAllPost,
    post,
    storePost,
  };
}
