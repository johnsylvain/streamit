import { h, Component } from 'preact'

import Header from '../Header'
import Footer from '../Footer'

import style from './style'

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
