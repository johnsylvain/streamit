import { h, Component } from 'preact'

import VideoQueueItem from '../VideoQueueItem'
import ProgressBar from '../ProgressBar'

import style from './style'

export default class VideoQueue extends Component {
  render() {
    return (
      <div class={style['video-queue']}>
        <div class={style['video-queue__header']}>
          <p>Queue</p>
        </div>
        <div class={style['video-queue__queue']}>
          <ProgressBar current={this.props.pointer} total={this.props.videos.length}/>
          {this.props.videos.map((video, i) =>
            <VideoQueueItem title={video.meta.title} key={video.meta._id} handleClick={this.props.handleClick(i)} />
          )}
        </div>
      </div>
    )
  }
}