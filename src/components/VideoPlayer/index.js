import { h } from 'preact'
import twas from 'twas'
import style from './style'

const VideoPlayer = ({ video }) =>
  <div class={style['video-player']}>
    <div class={style['video-player__video']} dangerouslySetInnerHTML={{ __html: video.media.iframe }}></div>
    <div class={style['video-player__detail']}>
      <h3>{video.meta.title}</h3>
      <p>by <strong>{video.meta.author}</strong> about {twas(video.meta.created)}</p>
    </div>
  </div>

export default VideoPlayer
