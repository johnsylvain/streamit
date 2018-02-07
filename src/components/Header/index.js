import { h } from 'preact'
import { route } from 'preact-router'
import style from './style'

const Header = (props) =>
  <header className={style.header}>
    <h1 onClick={() => route('/', false)}>Streamit</h1>
    {props.subreddit && <p>/r/{props.subreddit}</p>}
  </header>

export default Header
