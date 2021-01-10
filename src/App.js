import './App.css';

export default class App extends React.Component {
  constructor(props) {
    props(super);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: {},
      open: false
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
