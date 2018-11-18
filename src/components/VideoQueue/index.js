import { h, Component, cloneElement } from 'preact';

import ProgressBar from '../ProgressBar';
import style from './style';
import { truncate } from '../../lib/helpers';

const VideoQueueItem = ({ isActive, index, handleClick, video }) => (
  <div
    className={[style.item, isActive ? style.active : null].join(' ')}
    onClick={handleClick}
  >
    <div>{isActive ? '▶' : index}</div>
    <div className={style.background}>
      <img src={video.media.thumbnail || '/assets/placeholder.svg'} />
    </div>
    <div className={style.details}>
      <p>{truncate(video.meta.title, 35)}</p>
      <p>
        by <strong>{video.meta.author}</strong>
      </p>
    </div>
  </div>
);

export default class VideoQueue extends Component {
  static Item = VideoQueueItem;

  render() {
    const children = this.props.children.map((child, index) =>
      cloneElement(child, {
        handleClick: () => this.props.changeVideo(index),
        isActive: index === this.props.pointer,
        index: index + 1
      })
    );

    return (
      <div className={style.queue}>
        <div className={style.header}>
          <div>
            <p>Queue</p>
            <small>
              {`/r/${this.props.subreddit} - ${this.props.pointer + 1} / ${
                this.props.videos.length
              }`}
            </small>
          </div>
          <div>
            <button
              onClick={this.props.previous}
              disabled={this.props.pointer === 0}
            >
              ❮
            </button>
            <button
              onClick={this.props.next}
              disabled={this.props.pointer === this.props.videos.length - 1}
            >
              ❯
            </button>
          </div>
        </div>
        <ProgressBar
          current={this.props.pointer + 1}
          total={this.props.videos.length}
        />
        <div className={style.list}>
          <div>{children}</div>
        </div>
      </div>
    );
  }
}
