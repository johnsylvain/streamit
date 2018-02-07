import { h, Component } from 'preact'
import { route } from 'preact-router'

import style from './style'
import { unEntity } from '../../lib/helpers'
import VideoPlayer from '../../components/VideoPlayer'
import VideoQueue from '../../components/VideoQueue'
import Loader from '../../components/Loader'
import Page from '../../components/Page'

export default class Player extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: [],
      pointer: 0,
      input: props.subreddit || props.defaultSubreddit
    }
  }

  componentWillMount () {
    this.getVideos()
  }

  getVideos () {
    const { subreddit, defaultSubreddit } = this.props
    const baseUrl = `https://www.reddit.com/r/${subreddit || defaultSubreddit}/`

    fetch(`${baseUrl}hot.json?limit=100&after=`)
      .then(res => res.json())
      .then(json => {
        const children = json.data.children
          .filter(c => !c.data.stickied)
          .filter(c => !c.data.over_18)
          .filter(c => c.data.post_hint === 'rich:video')

        const videos = children
          .map((item, i) => ({
            meta: {
              author: item.data.author,
              score: item.data.score,
              title: item.data.title,
              permalink: item.data.permalink,
              created: item.data.created_utc * 1000,
              _id: item.data.id
            },
            media: {
              iframe: unEntity(item.data.media_embed.content || ''),
              thumbnail: item.data.thumbnail
            }
          }))

        console.log(videos)

        this.setState({
          videos,
          pointer: 0
        })
      })
      .catch(() => {
        route('/404', true)
      })
  }

  changeVideo = (direction) => () => {
    switch (direction) {
      case 'next':
        this.setState({
          pointer: (this.state.pointer < this.state.videos.length)
            ? this.state.pointer + 1
            : this.state.pointer
        })
        break
      case 'prev':
        this.setState({
          pointer: (this.state.pointer > 0)
            ? this.state.pointer - 1
            : 0
        })
        break
      default:
        this.setState({
          pointer: direction
        })
    }
  }

  render ({ subreddit }, { defaultSubreddit }) {
    return (
      <Page subreddit={subreddit || defaultSubreddit}>
        {this.state.videos.length
          ? (
            <div className={style.grid}>
              <VideoPlayer video={this.state.videos[this.state.pointer]} />
              <VideoQueue
                {...this.state}
                subreddit={subreddit || defaultSubreddit}
                handleClick={(p) => this.changeVideo(p)}/>
            </div>
          )
          : (
            <div className={style.interstitial}>
              <Loader />
            </div>
          )
        }
      </Page>
    )
  }
}
