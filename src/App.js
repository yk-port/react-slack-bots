import React, { useState, useEffect, useCallback } from "react";
import "./assets/styles/style.css";
import { AnswersList, Chats, FormDialog } from "./components";
import { db } from "./firebase";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: "question",
    });
    setAnswers(nextDataset.answers), setCurrentId(nextQuestionId);
  };

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "contact":
        handleClickOpen();
        break;

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;

      default:
        addChats({
          text: selectedAnswer,
          type: "answer",
        });

        // 遅延表示
        setTimeout(() => {
          displayNextQuestion(nextQuestionId, dataset[nextQuestionId]);
        }, 500);
        break;
    }
  };

  const addChats = (chat) => {
    setChats((prevChats) => {
      return [...prevChats, chat];
    });
  };

  useEffect(() => {
    (async () => {
      const initDataset = {};
      await db
        .collection("questions")
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            initDataset[doc.id] = doc.data();
          });
        });
      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []);

  // チャットエリアのスクロールの挙動
  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default App;
