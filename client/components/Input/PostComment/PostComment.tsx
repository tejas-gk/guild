import React from 'react'

export default function PostComment() {
  return (
      <div className="post-comment">
          <div className="post-comment__container">
              <div className="post-comment__container__input">    
                  <input type="text" placeholder="Add a comment" />
              </div>
              <div className="post-comment__container__btn">
                  <button>Post</button>
              </div>
          </div>
          
      </div>
      
  )
}
