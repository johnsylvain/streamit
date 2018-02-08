import { h } from 'preact'
import style from './style'

const Header = (props) =>
  <header className={style.header}>
    <h1><a href="/">Streamit</a></h1>
    {props.subreddit && <p>/r/{props.subreddit}</p>}
  </header>

export default Header
