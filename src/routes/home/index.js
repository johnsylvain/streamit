import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';

import Page from '../../components/Page';

import style from './style';

const Featured = ({ name, channels }) => (
  <div>
    <h4>{name}</h4>
    <div className={style.grid}>
      {channels.map(channel => (
        <a href={`/r/${channel}`} className={style.channel}>
          <span>{channel}</span>
        </a>
      ))}
    </div>
  </div>
);

class Home extends Component {
  handleSubmit = e => {
    e.preventDefault();
    route(`/r/${e.target.subreddit.value}`, false);
  };

  render() {
    return (
      <Page>
        <Page.Header />
        <div className={style.home}>
          <div className={style.cta}>
            <h3>
              Welcome to <strong>streamit</strong>.
            </h3>
            <p>Stream video content from your favorite subreddits.</p>
            <form className={style.form} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="subreddit"
                placeholder="Enter a subreddit"
                autocomplete="off"
              />
            </form>
          </div>
          <Featured name="Popular" channels={this.props.popular} />
        </div>
        <Page.Footer />
      </Page>
    );
  }
}

export default connect(state => ({ popular: state.popular }))(Home);
