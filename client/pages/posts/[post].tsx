import {useState,useEffect} from 'react'
import axios from 'lib/axios'
import {useRouter} from 'next/router'
import {useAsync} from 'hooks/useAsync'
import Card from '@/components/Card/Card'
export default function Posts({post}) {
    const getParentId = () => {
        const {query} = useRouter()
        return query.post
    }
    const [parentId,setParentId] = useState(getParentId())
    const [comments,setComments] = useState([])
    const [comment,setComment] = useState('')
    // const {data,loading,error,run} = useAsync()

    
    return (
        <div className='relative'>
        
        {post && <div className='thread'>
            <Card
            text={post.post}
            created_at={post.created_at}
            />
            </div>}   
        {
            post?.comments && post.comments.map((comment,index)=>{
                return(
                    <div key={index}>
                    <p className='thread ml-24'>
                    <h1 className='font-bold'>comments</h1><Card
                    text={comment.comment}
                    created_at={comment.created_at}
                    />
                    </p>
                     {comment.replies && comment.replies.map((reply,index)=>{
                        return(
                            <div key={index}>
                            <p className='thread font-bold ml-36'>replies 
                            <Card
                            text={reply.comment}
                            created_at={reply.created_at}
                            /></p>
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
