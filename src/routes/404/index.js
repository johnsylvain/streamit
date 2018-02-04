import { h } from 'preact'
import style from './style'

const NotFound = () =>
  <div className={style.notfound}>
    <div className={style.emoji}>💀</div>
    <h2><strong>404:</strong> Subreddit not found</h2>
  </div>

export default NotFound
