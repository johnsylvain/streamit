import { route } from 'preact-router'
import { unEntity } from './lib/helpers'

export default store => ({
  changeVideo: (state, pointer) => ({ pointer }),

  nextVideo: (state) => ({
    pointer: (state.pointer < state.videos.length)
      ? state.pointer + 1
      : state.pointer
  }),

  previousVideo: (state) => ({
    pointer: (state.pointer > 0)
      ? state.pointer - 1
      : 0
  }),

  async getVideos (state, subreddit) {
    store.setState({
      loading: true,
      error: {}
    })

    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`)
    const json = await response.json()

    if (json.error === 404) {
      return route('/404', false)
    }

    const videos = json.data.children
      .filter(v =>
        !v.data.stickied &&
        !v.data.over_18 &&
        v.data.post_hint === 'rich:video'
      )
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

    store.setState({
      videos,
      pointer: 0,
      loading: false,
      error: videos.length
        ? {}
        : {
          symbol: '&#x1F914;',
          message: 'No video content found'
        }
    })
  }
})
