import { useState, useEffect } from 'react';
import axios from 'lib/axios';
import { useRouter } from 'next/router';
import { useAsync } from 'hooks/useAsync';
import Card from '@/components/Card/Card';
import { Edit, Trash, Repeat } from 'react-feather';
import styles from './style.module.css';
import VoteBtn from '@/components/Button/VoteBtn';
import log from 'lib/log';

export default function Posts() {
  return (
    <div className="ml-96">
  

      <div className="comments-with-replies flex flex-row relative">
        {/* comments */}
           <VoteBtn />
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptates, quod, quia, voluptate quae voluptatem
                quibusdam voluptatum quos quas quidem nesciunt. Quisquam, quae.
                Quisquam
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="comment-form ">
        <div className="comment-form-header flex gap-4">
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
        </div>
        <div className="comment-form-body">
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            className="object-contain h-10 resize-none"
            placeholder="Write a comment..."></textarea>
        </div>
        <div className="comment-form-footer flex gap-4">
          <button className="btn btn-primary btn-sm">Comment</button>
        </div>
      </div> */}
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
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
