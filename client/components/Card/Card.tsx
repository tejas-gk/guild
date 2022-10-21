import styles from './Card.module.scss';
import {ThumbsUp,ThumbsDown,Repeat,Flag,MessageSquare} from 'react-feather'
export default function Card({text,image}:{text:string,image?:string}) {
  return (
    <div className={styles.container}>
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
