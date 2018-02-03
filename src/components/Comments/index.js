import { h } from 'preact'
import style from './style'

const Comments = (props) =>
  <div className={style.comments}>
    <div className={style['comments__header']}>Comments</div>
    <div className={style['comments__body']}>List</div>
  </div>

export default Comments
