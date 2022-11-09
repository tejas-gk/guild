import React from 'react'

import { Edit, Trash, Repeat } from 'react-feather';
import styles from './style.module.css';
import VoteBtn from '@/components/Button/VoteBtn';
export default function ThreadLine({
  comment,

}) {
  return (
    <>
      <div className="comment-replies relative">
        <div
          className="comments flex gap-4 mt-10 ml-24
        before:content-[''] before:absolute before:top-0 before:left-10 before:w-1 
        before:h-full before:bg-gray-300 before:ml-4 before:min-h-full
        ">
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
                <div className="comment-user-name">User Name</div>
                <div className="comment-date">Date</div>
              </div>
              <div className="comment-actions flex flex-row gap-2  ml-auto">
                <Edit size={16} />
                <Trash size={16} />
                <Repeat size={16} />
              </div>
            </div>
            <div className="comment-body truncate">
                  <p>
                  {comment}
              </p>
            </div>
          </div>
        </div>
          </div>
    </>
  )
}
