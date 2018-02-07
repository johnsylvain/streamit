import { h, Component } from 'preact'

import Header from '../Header'
import Footer from '../Footer'

import style from './style'

export default class Page extends Component {
    render () {
        return (
            <div className={style.page}>
                <Header subreddit={this.props.subreddit} />
                <div>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}
