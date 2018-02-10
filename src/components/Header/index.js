import { h } from 'preact'
import style from './style'

const Header = ({ subreddit }) =>
  <header className={style.header}>
    <h1><a href="/">Streamit</a></h1>
    {subreddit && <p>/r/{subreddit}</p>}
  </header>

export default Header
