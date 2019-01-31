import { Component } from 'preact';

export default class KeyHandler extends Component {
  componentDidMount() {
    window.addEventListener(this.props.keyEventName, this.handleKey);
  }

  componentWillMount() {
    window.removeEventListener(this.props.keyEventName, this.handleKey);
  }

  handleKey = (event) => {
    if (this.props.onKeyHandle && event.keyCode === this.props.keyCode) {
      this.props.onKeyHandle(event);
    }
  }

  render() {
    return null;
  }
}