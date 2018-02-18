import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../../actions'
import style from './style'

import VideoPlayer from '../../components/VideoPlayer'
import VideoQueue from '../../components/VideoQueue'
import Loader from '../../components/Loader'
import Page from '../../components/Page'
import ErrorMessage from '../../components/ErrorMessage'

class Player extends Component {
  componentWillMount () {
    this.props.getVideos(this.props.subreddit)
  }

  render () {
    const { 
      videos, pointer, subreddit, loading, error,
      changeVideo, nextVideo, previousVideo
    } = this.props

    const player = (
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

    const loader = (
      <div className={style.interstitial}>
        <Loader />
      </div>
    )

    const content = (error.message)
      ? <ErrorMessage symbol={error.symbol} text={error.message}/>
      : (loading) ? loader : player

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
    loading: state.loading,
    error: state.error
  }),
  actions
)(Player)
