import { h, Component } from 'preact'
import { Router } from 'preact-router'

import './style';
import Home from './routes/home'
import Redirect from './components/Redirect'

if (module.hot) {
	require('preact/debug')
}

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Redirect path="/" to="/r/videos" />
					<Home path="/r/:subreddit" defaultSubreddit="videos"/>
				</Router>
			</div>
		);
	}
}
