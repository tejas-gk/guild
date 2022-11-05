import {useState,useEffect} from 'react'
import axios from 'lib/axios'
import {useRouter} from 'next/router'
export default function Posts({post}) {
    return (
        <div>
        {post && <p>{post.post}</p>}   
        {
            post?.comments && post.comments.map((comment,index)=>{
                return <p key={index}>{comment.comment}</p>
            })
        }
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const query = context.query
    const res = await axios.get(`/posts/${query.post}`)
    const post = res.data
    return {
        props: {
            post
        }
    }
}
