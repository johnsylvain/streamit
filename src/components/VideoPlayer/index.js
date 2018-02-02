import { h } from 'preact'
import style from './style'

const VideoPlayer = (props) =>
  <div class={style['video-player']}>
    <div class={style['video-player__detail']}>
      <h3>title</h3>
      <p>meta</p>
    </div>
  </div>

export default VideoPlayer
