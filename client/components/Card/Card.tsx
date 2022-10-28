import styles from './Card.module.scss';
import {CardProps} from 'Interface/CardInterface';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Post from 'lib/helpers/Post';
import axios from 'lib/axios';
import {ThumbsUp,ThumbsDown,Repeat,Flag,MessageSquare,MoreHorizontal} from 'react-feather'
import MenuItems from 'components/Menu/Menu';

export default function Card({text,image,author,username,created_at,id}: CardProps) {
    const deletePost=()=>{
        axios.delete(`/delete-post/${id}`).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div className='flex items-center justify-center space-y-10 mb-4'>
    <div className='card border border-slate-200 shadow-lg w-3/6 p-7 h-44 dark:bg-dark_mode-800 dark:shadow-lg'>
       
        <div className='card-header flex flex-row gap-3 '>
            <span className='profile-header-user truncate'>{author}</span>
            <span className='profile-header-username truncate'>@{username}</span>
            <span className='profile-header-time truncate'>1 hr ago</span>
            <span className='profile-header-more ml-28 card-footer-icon '
            >
            <MenuItems 
            icon={<MoreHorizontal />}
            postId={id}
            />
            </span>
        </div>
        <Link href={`/posts/${id}`}>
            <a>
        <div className="card-main line-clamp-2">
            {text}
        </div>
        </a>
        </Link>
        <div className="card-footer pb-2">
            <div className="card-footer-icons flex flex-row justify-between pt-2">
                <div className="card-footer-icon">
                    <form action="" method="DELETE">
                    <ThumbsUp                  
                    onClick={() => {
                        deletePost();
                        console.log('like',id)
                    }
                    }
                    />
                    </form>
                </div>
                <div className="card-footer-icon">
                    <ThumbsDown/>
                </div>
                <div className="card-footer-icon">
                    <Repeat/>
                </div>
                <div className="card-footer-icon">
                    <MessageSquare/>
                </div>
                <div className="card-footer-icon">
                    <Flag/>
                </div>
            </div>
        </div>
    </div>
</div>
  ) 
}
