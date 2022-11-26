import {useState,useEffect} from 'react'
import axios from 'lib/axios'
import {useRouter} from 'next/router'
import {useAsync} from 'hooks/useAsync'
import Card from '@/components/Card/Card'
import Card0 from '@/components/Card/Card0'
import ThreadLine from '@/components/Card/Thread/ThreadLine'
import PostComment from '@/components/Input/PostComment/PostComment'
export default function Posts({ post }) {

    return (
        <div className='relative '>
        
        {post && <div className='ml-96'>
                <Card0
                    id={post.id}
                    text={post.post}
                    date={post.created_at}
                    user={post.users?.name}
                    uid={post.usersid}
                    // isOwner={true}
                    // comments={post.comments}
            />
            </div>}  
            <div className='mx-[50%]'>

            {/* <PostComment /> */}
            </div>
        {
            post?.comments && post.comments.map((comment,index)=>{
                return(
                    <div key={index}>
                    <div className='ml-[60vh]'>
                            <ThreadLine
                                comment={comment.comment}
                            />
                           
                        </div>
                     {comment.replies && comment.replies.map((reply,index)=>{
                        return(
                            <div key={index}>
                            <div className='ml-[70vh]'>
                                    <ThreadLine
                                        comment={reply.comment}
                                    />
                                </div>
                            </div>
                        )
                    })}
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
