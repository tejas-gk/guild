import styles from './style.module.css'
export default function test() {
  return (
    <div className={`${styles.container}  comments_container min-w-96 m-[3rem]`}     
    >
      <h1>Comments</h1> 
      <div className='comments'>
      <div className="comment_Card">
        <div className="comment__title">
            comment
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, id.
        </p>
        <div className="comment__footer">
          <span>likes 233</span>
          <span>dislikes 45</span>
          <span className='show-replies'>replies</span>
        </div>
        </div> 

      </div>
    </div>
  )
}
