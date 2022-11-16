import { useState, useEffect } from 'react';
import axios from 'lib/axios';
import { useRouter } from 'next/router';
import { useAsync } from 'hooks/useAsync';
import Card from '@/components/Card/Card';
import { Edit, Trash, Repeat, Flag,Bookmark ,MessageSquare} from 'react-feather';
import styles from './style.module.css';
import VoteBtn from '@/components/Button/VoteBtn';
import { Card0Props } from '@/setup/Interfaces/CardInterface';
import Icon from './Icon/Icon';
import Link from 'next/link';
import Post from 'lib/helpers/Post';
export default function Card0({
  text,
  user,
  id
}: Card0Props) {
  const {deletePost} = Post()
  return (
    <div className=" w-[56rem]">
  <div className="comments-with-replies flex flex-row relative  w-[56rem]">
        {/* comments */}
        <VoteBtn
        count={0}
        id={59}
        />
        <div className="comments flex gap-4">
          <div className="comment shadow-md p-4 w-[56rem]">
            <div className="comment-header flex gap-4">
              <div className="comment-user">
                <img
                  src="https://picsum.photos/200"
                  alt="user"
                  className="rounded-full w-8 h-8"
                />
              </div>
              <div className="comment-info flex flex-row gap-2">
                <div className="comment-user-name">{user}</div>
                <div className="comment-date">Date</div>
              </div>
              <div className="comment-actions flex flex-row gap-2  ml-auto cursor-pointer">
                <span className='cursor-pointer hover:text-yellow-500'><Edit size={16} /></span>
                <span className='cursor-pointer hover:text-red-500'>
                <Trash size={16}
                  onClick={() => deletePost(id)}
                />
                </span>
              </div>
            </div>
            <Link href={`/posts/${id}`}>
              <a>
            <div className="comment-body">
                  <p className='
                  line-clamp-4 break-words 

              '>
                {text}
              </p>
              </div>
              </a>
              </Link>
            
            <div className="comment-footer flex flex-row gap-4 mt-14 justify-between">
              <span
                className='cursor-pointer hover:text-blue-500 
              '>
                <Icon icon={<Flag size={16} />} size={0} /></span>
              <span
              className='cursor-pointer hover:text-green-500'
              ><Icon icon={<Repeat size={16} />} size={0} /></span>
              <span
              className='cursor-pointer hover:text-red-500'
              ><Icon icon={<Bookmark size={16} />} size={0} /></span>
              <span
              className='cursor-pointer hover:text-purple-500'
              ><Icon icon={<MessageSquare size={16} />} size={0} /></span>
            </div>
            
          </div>
        </div>
        
      </div>
     
    </div>
  );
}
