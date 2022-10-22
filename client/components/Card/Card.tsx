import styles from './Card.module.scss';
import {CardProps} from 'Interface/CardInterface';

import {ThumbsUp,ThumbsDown,Repeat,Flag,MessageSquare} from 'react-feather'
export default function Card({text,image,author,username,created_at}: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {author}-@{username}
        {created_at}
      </div>  
        <h1>{text}</h1>
        {image && <img src={image} alt={text} />}
        <footer className={styles.card__footer}>
          <span className={styles.card__footer__span}> <ThumbsUp /></span>
        <span className={styles.card__footer__span}>  <ThumbsDown /></span>
        <span className={styles.card__footer__span}> <Repeat /></span>
        <span className={styles.card__footer__span}>  <MessageSquare /></span>
        <span className={styles.card__footer__span}>   <Flag /></span>
        </footer>
    </div>
  ) 
}
