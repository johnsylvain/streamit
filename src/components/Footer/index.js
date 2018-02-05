import { h } from 'preact'
import style from './style'

const Footer = () =>
  <footer className={style.footer}>
    John Sylvain &copy; {new Date().getFullYear()}
  </footer>

export default Footer
