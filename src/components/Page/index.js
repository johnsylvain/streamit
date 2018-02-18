import { h, Component } from 'preact'
import style from './style'

const Header = ({ subreddit }) =>
  <header className={style.header}>
    <h1><a href="/">Streamit</a></h1>
    {subreddit && <p>/r/{subreddit}</p>}
  </header>

const Footer = () =>
  <footer className={style.footer}>
    John Sylvain &copy; {new Date().getFullYear()}
  </footer>

export default class Page extends Component {
  static Header = Header
  static Footer = Footer

  render () {
    return (
      <div className={style.page}>
        {this.props.children}
      </div>
    )
  }
}
