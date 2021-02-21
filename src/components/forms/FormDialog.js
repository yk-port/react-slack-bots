import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { TextInput } from "../../components";

export default class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    };
    this.inputName = this.inputName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
  }

  inputName = (event) => {
    this.setState({ name: event.target.value });
  };

  inputEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  inputDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  submitForm = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;
    const payload = {
      text:
        "お問い合わせがありました\n" +
        "お名前: " +
        name +
        "\n" +
        "メールアドレス: " +
        email +
        "\n" +
        "【問い合わせ内容】\n" +
        description,
    };
    const url =
      "https://hooks.slack.com/services/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";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(() => {
      alert("送信が完了しました。");
      this.setState({
        name: "",
        email: "",
        description: "",
      });
      return this.props.handleClose();
    });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
          <DialogContent>
            <TextInput
              label={"名前(必須)"}
              multiline={false}
              rows={1}
              value={this.state.name}
              type={"text"}
              onChange={this.inputName}
            />
            <TextInput
              label={"メールアドレス(必須)"}
              multiline={false}
              rows={1}
              value={this.email}
              type={"email"}
              onChange={this.inputEmail}
            />
            <TextInput
              label={"お問い合わせ内容(必須)"}
              multiline={true}
              rows={5}
              value={this.description}
              type={"text"}
              onChange={this.inputDescription}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={this.submitForm} color="primary" autoFocus>
              送信する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
