import styles from './vote-btn.module.css';
import { numberOrNull, numberOrString } from '@/setup/types/CommonType';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'lib/axios';
import useAuth from 'hooks/useAuth';
import { log } from 'lib/log';
export default function VoteBtn({ ucount = 0,id,dcount=0}: { ucount: number ,id:numberOrString,dcount:number}) {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [voteCount, setVoteCount] = useState<numberOrNull>(ucount);
  
  const { }=useAuth({middleware:'auth'});
    const upvoteRequest = async () => {
      const res = await axios.post(`upvote/${id}`);
      const data = await res.data;
      // mutate(`upvote/${id}`, { upvote: true, downvote: false });
      log(upvote)
  }
    return (
      <div className={`vote-btn ${styles.voteBtnContainer}`}>
        <form  method="post">
        <button
          className={`btn btn-primary btn-sm ${styles.voteBtn}`}
          onClick={() => {
            setUpvote(!upvote);
            setDownvote(false);
            setVoteCount(upvote ? voteCount - 1 : voteCount + 1);
            upvoteRequest();
          }}
        >
            {
                // if auth user upvoted
              upvote ? (
                <span className="text-red-500">
                  +
                </span>
              ) : (
                  <span className="text-gray-500">
                    +
                </span>
              )
            }
        </button>
         </form>
        <span className={`${styles.voteCount}`}>
          {ucount-dcount}
        </span>
        <button
          className={`btn btn-primary btn-sm ${styles.voteBtn}`}
          onClick={() => {
            setDownvote(!downvote);
            setUpvote(false);
            setVoteCount(downvote ? voteCount + 1 : voteCount - 1);
          }}
        >
          {
            // TODO:show color of what action user performed
            downvote ? (
              <span className="text-blue-500">
                -
              </span>
            ) : (
                <span className="text-gray-500">
                  -
              </span>
            )
          }
        </button>
      </div>
    )
}