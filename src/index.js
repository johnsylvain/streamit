import { h, Component } from 'preact'
import { Router } from 'preact-router'
import createStore from 'unistore'
import { Provider } from 'unistore/preact'

import './style';
import Player from './routes/player'
import Home from './routes/home'
import NotFound from './routes/404'
import Redirect from './components/Redirect'

if (module.hot) {
  require('preact/debug')
}

let store = createStore({
  videos: [],
  pointer: 0,
  loading: true,
  popular: [
    'videos', 'movies', 'television',
    'documentaries', 'holdmybeer', 'foodvideos'
  ]
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router>
            <Home path="/" />
            <Player path="/r/:subreddit"/>
            <Redirect path="/r" to="/r/videos" />
            <NotFound path="/404" />
          </Router>
        </div>
      </Provider>
    )
  }
}
