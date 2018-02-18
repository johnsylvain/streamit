import { h } from 'preact'
import style from './style'

const ErrorMessage = ({ emoji, text, code }) =>
  <div className={style.error}>
    <div className={style.emoji}>{emoji}</div>
    <h2>
      {code && <strong>{code}:&nbsp;</strong>}
      {text}
    </h2>
  </div>

export default ErrorMessage