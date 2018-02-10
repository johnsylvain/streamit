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

  render () {
    const { 
      videos, pointer, subreddit, loading,
      changeVideo, nextVideo, previousVideo
    } = this.props

    const content = loading
      ? (
        <div className={style.interstitial}>
          <Loader />
        </div>
      )
      : (
        <div className={style.grid}>
          <VideoPlayer video={videos[pointer]} />
          <VideoQueue
            subreddit={subreddit}
            changeVideo={changeVideo}
            next={nextVideo}
            previous={previousVideo}
            {...this.props}
          >
            {videos.map(video =>
              <VideoQueue.Item video={video}/>
            )}
          </VideoQueue>
        </div>
      )

    return (
      <Page>
        <Page.Header subreddit={subreddit}/>
        {content}
        <Page.Footer />
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
