import { h } from 'preact';
import style from './style';

const ProgressBar = ({ current, total }) => (
  <div class={style.progress}>
    <div style={{ width: `${(current / total) * 100}%` }} />
  </div>
);

export default ProgressBar;
