import { h } from 'preact'
import style from './style'

import Page from '../../components/Page'

const NotFound = () =>
  <Page>
    <div className={style.notfound}>
      <div className={style.emoji}>💀</div>
      <h2><strong>404:</strong> Subreddit not found</h2>
    </div>
  </Page>

export default NotFound
