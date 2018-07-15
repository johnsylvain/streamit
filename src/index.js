import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createStore from 'unistore';
import { Provider } from 'unistore/preact';
import storage from 'store';

import './style';
import Player from './routes/player';
import Home from './routes/home';
import NotFound from './routes/404';
import Redirect from './components/Redirect';

if (module.hot) {
  require('preact/debug');
}

let store = createStore({
  videos: [],
  error: {},
  pointer: 0,
  loading: true,
  recent: storage.get('recent'),
  popular: [
    'videos',
    'movies',
    'television',
    'documentaries',
    'holdmybeer',
    'foodvideos'
  ]
});

store.subscribe(state => storage.set('recent', state.recent));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router>
            <Home path="/" />
            <Player path="/r/:subreddit" />
            <Redirect path="/r" to="/r/videos" />
            <NotFound
              path="/404"
              emoji="&#x1F480;"
              text="Subreddit not found"
              code="404"
            />
          </Router>
        </div>
      </Provider>
    );
  }
}
