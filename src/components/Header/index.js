import { h } from 'preact'
import { route} from 'preact-router'
import style from './style'

const Header = (props) =>
  <header className={style.header}>
    <h1 onClick={() => route('/', false)}>Streamit</h1>
    {props.handleSubmit && 
      <form onSubmit={props.handleSubmit}>
        /r/<input
          type='text'
          name='subreddit'
          autocomplete='off'
          defaultValue={props.subreddit}/>
      </form>
    }
  </header>

export default Header
