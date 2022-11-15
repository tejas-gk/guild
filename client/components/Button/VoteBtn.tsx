import styles from './vote-btn.module.css';
import { numberOrNull, numberOrString } from '@/setup/types/CommonType';
import { useState, useEffect } from 'react';
import axios from 'lib/axios';
import useAuth from 'hooks/useAuth';
export default function VoteBtn({ count = 0,id }: { count: number ,id:numberOrString}) {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [voteCount, setVoteCount] = useState<numberOrNull>(count);
  
  const { }=useAuth({middleware:'auth'});
    const voteRequest = async () => {
      const res = await axios.post(`upvote/${id}`);
      const data = await res.data;
      console.log(data);
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
            voteRequest();
          }}
        >
          +
        </button>
         </form>
        <span className={`${styles.voteCount}`}>
          {voteCount === null ? 0 : voteCount}
        </span>
        <button
          className={`btn btn-primary btn-sm ${styles.voteBtn}`}
          onClick={() => {
            setDownvote(!downvote);
            setUpvote(false);
            setVoteCount(downvote ? voteCount + 1 : voteCount - 1);
          }}
        >
          -
        </button>
      </div>
    )
}