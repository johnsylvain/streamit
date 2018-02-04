import { h } from 'preact'
import twas from 'twas'
import style from './style'

const Comment = ({ author, body, created, children }) => (
  <div className={style.comment}>
    <div className={style['comment__body']}>
      <p>{body}</p>
      <small>by <strong>{author}</strong> about {twas(created * 1000)}</small>
    </div>
    <div className={style['comment_children']}>
      {children.map(child => 
        child.kind === 't1'
          ? <Comment 
            body={child.data.body}
            author={child.data.author}
            created={child.data.created_utc}            
            children={typeof child.data.replies !== 'string'
              ? child.data.replies.data.children
              : []}/>
          : null
      )}
    </div>
  </div>
)

const Comments = (props) =>
  <div className={style.comments}>
    <div className={style['comments__header']}>Comments</div>
    <div className={style['comments__body']}>
      {Object.keys(props.comments).length
        ? <Comment 
            body={props.comments.body}
            author={props.comments.author}
            created={props.comments.created_utc}
            children={props.comments.replies.data.children}/>
        : 'No comments'
      }
    </div>
  </div>

export default Comments
