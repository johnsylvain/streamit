import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'unistore/preact';

import Page from '../../components/Page';

import style from './style';
import actions from '../../actions';

const Featured = ({ name, channels, isEditable, handleClick }) => (
  <div className={style.featured}>
    <h4>{name}</h4>
    <div className={style.grid}>
      {channels.map(channel => (
        <div className={style.channel}>
          <a href={`/r/${channel}`} className={style.channelName}>
            <span>{channel}</span>
          </a>
          {isEditable && (
            <span
              className={style.channelAction}
              onClick={() => handleClick(channel)}
            >
              &times;
            </span>
          )}
        </div>
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
            <h3>Welcome to streamit.</h3>
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
          {!!this.props.recent.length && (
            <Featured
              name="Recent"
              channels={this.props.recent}
              handleClick={this.props.removeRecentChannel}
              isEditable
            />
          )}
          <Featured name="Popular" channels={this.props.popular} />
        </div>
        <Page.Footer />
      </Page>
    );
  }
}

export default connect(
  state => ({
    popular: state.popular,
    recent: state.recent
  }),
  actions
)(Home);
