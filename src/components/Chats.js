import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import { Chat } from "../components";

const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: "400px",
      padding: "0",
      overflow: "auto",
    },
  })
);

const Chats = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.chats} id={"scroll-area"}>
      {props.chats.map((chat, index) => (
        <Chat text={chat.text} type={chat.type} key={index.toString()} />
      ))}
    </List>
  );
};

export default Chats;
