import { h } from 'preact'
import style from './style'

import ErrorMessage from '../../components/ErrorMessage'
import Page from '../../components/Page'

const NotFound = (props) =>
  <Page>
    <Page.Header />
    <ErrorMessage {...props}/>
    <Page.Footer />
  </Page>

export default NotFound
