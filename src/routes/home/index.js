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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
              </svg>
            </form>
          </div>
          {typeof window !== 'undefined' && !!this.props.recent.length && (
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
