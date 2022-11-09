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
export default function Card0({
  id,
  text,
  count,
  user,
  createdAt,
  updatedAt,
  isOwner,
  comments,
  isVoted,
  isVotedCount,
  isVotedUser,
}:Card0Props) {
  return (
    <div className="ml-96">
  

      <div className="comments-with-replies flex flex-row relative">
        {/* comments */}
          <VoteBtn count={0} />
        <div className="comments flex gap-4">
          <div className="comment shadow-md p-4 w-96">
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
              <div className="comment-actions flex flex-row gap-2  ml-auto">
                <Edit size={16} />
                <Trash size={16} />
                <Repeat size={16} />
              </div>
            </div>
            <div className="comment-body">
              <p>
                {text}
              </p>
            </div>
            
            <div className="comment-footer flex flex-row gap-4 mt-4 justify-between">
              <Icon icon={<Flag size={16} />} size={0} />
              <Icon icon={<Repeat size={16} />} size={0} />
              <Icon icon={<Bookmark size={16} />} size={0} />
              <Icon icon={<MessageSquare size={16} />} size={0} />
            </div>
            
          </div>
        </div>
        
      </div>
     
    </div>
  );
}
