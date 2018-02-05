import { h, Component } from 'preact'
import { route } from 'preact-router'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import style from './style'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      popular: [
        'videos', 'movies', 'television', 'documentaries', 'holdmybeer', 'nononono'
      ]
    }
  }

  changeRoute = (channel) => {
    route(`/r/${channel}`, false)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.changeRoute(e.target.subreddit.value)
  }

  render () {
    return (
      <div className={style.home}>
        <Header />
        <div className={style.feature}>
          <div className={style.cta}>
            <h3>Stream video content from your favorite subreddits.</h3>
            <form className={style.form} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="subreddit"
                placeholder="Enter a subreddit"
                autocomplete="off"/>
            </form>
          </div>
          <div>
            <h3>Popular</h3>
            <div className={style.grid}>
              {this.state.popular.map(channel =>
                <div onClick={() => this.changeRoute(channel)} className={style.channel}>
                  <span>{channel}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
