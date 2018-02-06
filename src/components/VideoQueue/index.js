import { h, Component } from 'preact'

import VideoQueueItem from '../VideoQueueItem'
import ProgressBar from '../ProgressBar'

import style from './style'

export default class VideoQueue extends Component {
  render () {
    return (
      <div className={style.queue}>
        <div className={style.header}>
          <div>
            <p>Queue</p>
            <small>{`/r/${this.props.subreddit}`} - {`${this.props.pointer + 1} / ${this.props.videos.length}`}</small>
          </div>
          <div>
            <button
              onClick={this.props.handleClick('prev')}
              disabled={this.props.pointer === 0}>❮</button>
            <button
              onClick={this.props.handleClick('next')}
              disabled={this.props.pointer === this.props.videos.length - 1}>❯</button>
          </div>
        </div>
        <ProgressBar current={this.props.pointer + 1} total={this.props.videos.length}/>
        <div className={style.list}>
          <div>
            {this.props.videos.map((video, i) =>
              <VideoQueueItem
                title={video.meta.title}
                image={video.media.thumbnail}
                key={video.meta._id}
                i={i+1}
                author={video.meta.author}
                active={this.props.pointer === i}
                handleClick={this.props.handleClick(i)} />
            )}
          </div>
        </div>
      </div>
    )
  }
}