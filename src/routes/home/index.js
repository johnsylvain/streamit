import { h, Component } from 'preact';
import style from './style';

import VideoPlayer from '../../components/VideoPlayer'

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<VideoPlayer />
			</div>
		);
	}
}
