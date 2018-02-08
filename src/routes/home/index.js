import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'unistore/preact'

import Page from '../../components/Page'

import style from './style'

class Home extends Component {
  changeRoute = (channel) => {
    route(`/r/${channel}`, false)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.changeRoute(e.target.subreddit.value)
  }

  render () {
    return (
      <Page>
        <div className={style.home}>
          <div className={style.cta}>
            <h3>Welcome to streamit.</h3>
            <p>Stream video content from your favorite subreddits.</p>
            <form className={style.form} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="subreddit"
                placeholder="Enter a subreddit"
                autocomplete="off"/>
            </form>
          </div>
          <div>
            <h4>Popular</h4>
            <div className={style.grid}>
              {this.props.popular.map(channel =>
                <div onClick={() => this.changeRoute(channel)} className={style.channel}>
                  <span>{channel}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default connect(
  state => ({ popular: state.popular })
)(Home)
