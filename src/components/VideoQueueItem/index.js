import { h } from 'preact'

import style from './style'

const VideoQueueItem = (props) =>
  <div class={style['video-queue-item']} onClick={props.handleClick}>
    {props.title}
  </div>

export default VideoQueueItem
