import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import actions from '../../actions';
import style from './style';

import VideoPlayer from '../../components/VideoPlayer';
import VideoQueue from '../../components/VideoQueue';
import Loader from '../../components/Loader';
import Page from '../../components/Page';
import ErrorMessage from '../../components/ErrorMessage';

class Player extends Component {
  componentWillMount() {
    this.props.getVideos(this.props.subreddit);
  }

  render() {
    const player = (
      <div className={style.grid}>
        <VideoPlayer video={this.props.videos[this.props.pointer]} />
        <VideoQueue
          subreddit={this.props.subreddit}
          changeVideo={this.props.changeVideo}
          next={this.props.nextVideo}
          previous={this.props.previousVideo}
          {...this.props}
        >
          {this.props.videos.map(video => <VideoQueue.Item video={video} />)}
        </VideoQueue>
      </div>
    );

    const content = this.props.error.message ? (
      <ErrorMessage
        symbol={this.props.error.symbol}
        text={this.props.error.message}
      />
    ) : this.props.loading ? (
      <Loader />
    ) : (
      player
    );

    return (
      <Page>
        <Page.Header subreddit={this.props.subreddit} />
        {content}
        <Page.Footer />
      </Page>
    );
  }
}

export default connect(
  state => ({
    videos: state.videos,
    pointer: state.pointer,
    loading: state.loading,
    error: state.error
  }),
  actions
)(Player);
