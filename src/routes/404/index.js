import { h } from 'preact'
import style from './style'

import Page from '../../components/Page'

const NotFound = () =>
  <Page>
    <Page.Header />
    <div className={style.notfound}>
      <div className={style.emoji}>&#x1F480;</div>
      <h2><strong>404:</strong> Subreddit not found</h2>
    </div>
    <Page.Footer />
  </Page>

export default NotFound
