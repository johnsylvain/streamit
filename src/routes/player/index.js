import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../../actions'
import style from './style'

import VideoPlayer from '../../components/VideoPlayer'
import VideoQueue from '../../components/VideoQueue'
import Loader from '../../components/Loader'
import Page from '../../components/Page'

class Player extends Component {
  componentWillMount () {
    this.props.getVideos(this.props.subreddit)
  }

  render ({ subreddit }) {
    return (
      <Page subreddit={subreddit}>
        {this.props.loading
          ? (
            <div className={style.interstitial}>
              <Loader />
            </div>
          )
          : (
            <div className={style.grid}>
              <VideoPlayer video={this.props.videos[this.props.pointer]} />
              <VideoQueue
                {...this.props}
                subreddit={subreddit}
                changeVideo={this.props.changeVideo}
                next={this.props.nextVideo}
                previous={this.props.previousVideo}>
                {this.props.videos.map(video =>
                  <VideoQueue.Item video={video}/>
                )}
              </VideoQueue>
            </div>
          )
        }
      </Page>
    )
  }
}

export default connect(
  state => ({
    videos: state.videos,
    pointer: state.pointer,
    loading: state.loading
  }),
  actions
)(Player)
