import { h, Component } from 'preact'

import style from './style'

import VideoPlayer from '../../components/VideoPlayer'
import VideoQueue from '../../components/VideoQueue'

function unEntity (str) {
	return str
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
}

export default class Home extends Component {
	constructor (props) {
		super(props)

		this.state = {
			videos: null,
			pointer: 0
		}

		this.changeVideo = this.changeVideo.bind(this)
	}

	componentWillMount () {
		const { subreddit, defaultSubreddit } = this.props
		fetch(`https://www.reddit.com/r/${subreddit || defaultSubreddit}/hot.json?limit=100&after=`)
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
							created: item.data.created_utc * 1000,
							_id: item.data.id
						},
						media: {
							iframe: unEntity(item.data.media_embed.content|| ''),
							thumbnail: item.data.thumbnail
						}
					}))
				this.setState({ videos })
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
				break
		}
	}

	render ({ subreddit }, { defaultSubreddit }) {
		return (
			<div>
				{this.state.videos
					? (
						<div class={style.home}>
							<VideoPlayer video={this.state.videos[this.state.pointer]} />
							<VideoQueue 
								{...this.state}
								handleClick={(p) => this.changeVideo(p)}/>
						</div>
					)
					: 'Loading'
				}
			</div>
		);
	}
}
