import { h, Component } from 'preact'

import VideoQueueItem from '../VideoQueueItem'
import ProgressBar from '../ProgressBar'

import style from './style'

export default class VideoQueue extends Component {
  render () {
    return (
      <div className={style['video-queue']}>
        <div className={style['video-queue__header']}>
          <p>Queue</p>
          <button onClick={this.props.handleClick('prev')}>prev</button>
          <button onClick={this.props.handleClick('next')}>next</button>
        </div>
        <ProgressBar current={this.props.pointer} total={this.props.videos.length}/>
        <div className={style['video-queue__queue']}>
          {this.props.videos.map((video, i) =>
            <VideoQueueItem 
              title={video.meta.title}
              key={video.meta._id}
              active={this.props.pointer === i}
              handleClick={this.props.handleClick(i)} />
          )}
        </div>
      </div>
    )
  }
}