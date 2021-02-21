import React from "react";
import { ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
import NoProfile from "../assets/img/no-profile.png";
import UserProfile from "../assets/img/torahack.png";

const Chat = (props) => {
  const isQuestion = props.type === "question";
  const classes = isQuestion ? "p-chat__row" : "p-chat__reverse";

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={UserProfile} />
        ) : (
          <Avatar alt="icon" src={NoProfile} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{props.text}</div>
    </ListItem>
  );
};

export default Chat;
