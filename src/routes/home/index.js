import { h, Component } from 'preact'
import { route } from 'preact-router'
import { connect } from 'unistore/preact'

import Page from '../../components/Page'

import style from './style'

class Home extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    route(`/r/${e.target.subreddit.value}`, false)
  }

  render () {
    return (
      <Page>
        <Page.Header />
        <div className={style.home}>
          <div className={style.cta}>
            <h3>Welcome to <strong>streamit</strong>.</h3>
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
                <a href={`/r/${channel}`} className={style.channel}>
                  <span>{channel}</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <Page.Footer />
      </Page>
    )
  }
}

export default connect(
  state => ({ popular: state.popular })
)(Home)
