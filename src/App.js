import React, { Component } from "react";
import "./assets/styles/style.css";
import { AnswersList, Chats, FormDialog } from "./components";
import { db } from "./firebase";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question",
    });
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    });
  };

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "init":
        this.displayNextQuestion(nextQuestionId);
        break;

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;

      case nextQuestionId === "contact":
        this.handleClickOpen();
        break;

      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: "answer",
        });
        this.setState({
          chats: chats,
        });

        // 遅延表示
        setTimeout(() => {
          this.displayNextQuestion(nextQuestionId);
        }, 500);
        break;
    }
  };

  initDataset = (dataset) => {
    this.setState({ dataset });
  };

  componentDidMount() {
    (async () => {
      const dataset = this.state.dataset;
      await db
        .collection("question")
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            dataset[id] = data;
          });
        });
      this.initDataset(dataset);
      const initAnswer = "";
      this.selectAnswer(initAnswer, this.state.currentId);
    })();
  }

  // チャットエリアのスクロールの挙動
  componentDidUpdate() {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}
