import {useState,useEffect} from 'react'
import axios from 'lib/axios'
import {useRouter} from 'next/router'
export default function Posts() {
    const [post, setPost] = useState(null)
    const router = useRouter()
    let id:any=router.query.post 

    useEffect(() => {
        axios.get(`/post/${id}`).then(res => {
        setPost(res.data)
        })
        console.log(router.query,id)
    }, [])


    return (
        <div>
        <h1>Post</h1>
        
        {post && <p>{post.post}</p>}
        </div>
    )
}
