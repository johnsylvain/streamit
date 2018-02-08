import { h, Component } from 'preact'
import { Router } from 'preact-router'

import './style';
import Player from './routes/player'
import Home from './routes/home'
import NotFound from './routes/404'
import Redirect from './components/Redirect'

if (module.hot) {
  require('preact/debug')
}

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Home path="/" />
          <Player path="/r/:subreddit" defaultSubreddit="videos"/>
          <Redirect path="/r" to="/r/videos" />
          <NotFound path="/404" />
        </Router>
      </div>
    )
  }
}
