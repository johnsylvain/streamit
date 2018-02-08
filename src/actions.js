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

  getVideos: (state, subreddit) => {
    store.setState({
      loading: true
    })
    
    const baseUrl = `https://www.reddit.com/r/${subreddit}/`
    fetch(`${baseUrl}hot.json?limit=100&after=`)
      .then(res => res.json())
      .then(json => {
        const videos = json.data.children
          .filter(c => !c.data.stickied)
          .filter(c => !c.data.over_18)
          .filter(c => c.data.post_hint === 'rich:video')
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
          loading: false
        })
      })
      .catch(() => {
        route('/404', true)
      })
  }
})
