import axios from "lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Post() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getAllPost = () => {
    axios.get(`/post/`).then((response) => {
      setPost(response.data.post);
      console.log(response.data);
    });
  };
  const storePost = ({ post }) => {
    axios
      .post("/post", {
        post,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  return {
    getAllPost,
    post,
    comments,
    storePost,
  };
}
