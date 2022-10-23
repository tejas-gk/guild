import {useState,useEffect} from 'react'
import axios from 'lib/axios'
import {useRouter} from 'next/router'
export default function Posts(id:number) {
    const router = useRouter()
    // useEffect(() => {
        //     axios.get(`/post/${id}`).then(res => {
            //         setPost(res.data)
            //     })
            // },[])
            
            const getAParticularPost:any = async (id) => {
                axios.get("/post/1").then((response) => {
                    setPost(response.data);
                });
            };
            const [post,setPost] = useState(getAParticularPost(id))

    return (
        <div>
        <h1>Post</h1>
        {post && <p>{post.post}</p>}
        </div>
    )
}
