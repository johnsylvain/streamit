import { h } from 'preact'

import style from './style.scss'
import { truncate } from '../../lib/helpers'

const VideoQueueItem = (props) =>
  <div
    className={[
      style.item,
      (props.active) ? style.active : null
    ].join(' ')}
    onClick={props.handleClick}>
    <div>
      {props.active ? '▶' : props.i}
    </div>
    <div className={style.background}>
      <img src={props.image || '/assets/placeholder.svg'}/>
    </div>
    <div className={style.details}>
      <p>{truncate(props.title, 35)}</p>
      <p>{props.author}</p>
    </div>
  </div>

export default VideoQueueItem
