import { h } from 'preact'
import style from './style'

const ErrorMessage = ({ symbol, text, code }) =>
  <div className={style.error}>
    <div
      className={style.symbol}
      dangerouslySetInnerHTML={{ __html: symbol }} />
    <h2>
      {code && <strong>{code}:&nbsp;</strong>}
      {text}
    </h2>
  </div>

export default ErrorMessage