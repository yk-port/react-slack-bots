import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';

export default class App extends React.Component {
  constructor(props) {
    props(super);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false
    }
  }

  render() {
    return (
      <section className="c-section">
      </section>
    );
  }
}
