import { h, Component } from 'preact';
import style from './style';

import VideoPlayer from '../../components/VideoPlayer'

function unEntity(str){
	console.log(str)
	return str
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
}

export default class Home extends Component {
	constructor(props) {
		super(props)

		console.log(props)
	}

	componentWillMount () {
		fetch(`https://www.reddit.com/r/${this.props.subreddit}/hot.json?limit=100&after=`)
			.then(res => res.json())
			.then(json => {
				console.log(json.data.children)
				const videos = json.data.children
					.filter(v => !v.data.over_18)
					.map(item => ({
						meta: {
							author: item.data.author,
							score: item.data.score,
							title: item.data.title,
							permalink: item.data.permalink,
							created: item.data.created
						},
						media: {
							iframe: unEntity(item.data.media_embed.content|| ''),
							thumbnail: item.data.thumbnail
						}
					}))
				this.setState({ videos })
			})
	}

	render({ subreddit }, { defaultSubreddit }) {
		return (
			<div class={style.home}>
				{this.state.videos
					? <VideoPlayer video={this.state.videos[0]} />
					: 'Loading'
				}
				<pre>{JSON.stringify(this.state.videos, null, '  ')}</pre>
			</div>
		);
	}
}
