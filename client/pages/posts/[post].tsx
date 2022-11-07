import {useState,useEffect} from 'react'
import axios from 'lib/axios'
import {useRouter} from 'next/router'
export default function Posts({post}) {
    console.log(post)
    return (
        <div>
        
        {post && <p>{post.post}</p>}   
        {
            post?.comments && post.comments.map((comment,index)=>{
                return(
                    <div key={index}>
                    <p>{comment.comment}</p>
                     {comment.replies && comment.replies.map((reply,index)=>{
                        return(
                            <div key={index}>
                            <p className='font-bold'>replies {reply.comment}</p>
                            </div>
                        )
                    })}
                    <hr />
                    </div>
                )
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
