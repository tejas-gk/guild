import styles from './vote-btn.module.css';
import { numberOrNull } from '@/setup/types/CommonType';
import {useState,useEffect} from 'react';
export default function VoteBtn({count=0}:{count:number}) {
    return (
         <div className={`vote-btn ${styles.voteBtnContainer}`}>
        <button className={`btn btn-primary btn-sm ${styles.voteBtn}`}>
          +
        </button>
        <span className={`${styles.voteCount}`}>
          {count}
        </span>
        <button className={`btn btn-primary btn-sm ${styles.voteBtn}`}>
          -
        </button>
      </div>
    )
}