import { h } from 'preact'
import style from './style.css'

const ProgressBar = ({ current, total }) =>
  <div class={style.progress}>
    <div style={{width: `${current / total * 100}%`}}></div>
  </div>

export default ProgressBar
