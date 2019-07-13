import React, { Component } from "react";
import Config from "../config";
import Context from "../context";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: {
        value: "",
        touched: false
      }
    };
  }

  static contextType = Context;

  getFolderTitle = title => {
    this.setState({
      folder: {
        value: title,
        touched: true
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const folder = {
      name: e.target.title.value
    };

    fetch(`${Config.API_ENDPOINT}/folders`, {
      method: "post",
      body: JSON.stringify(folder),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => {
            throw error;
          });
        return res.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.setState({ folder: { value: "", touched: false } });
        this.props.history.goBack();
      });
  };

  render() {
    return (
      <div className="add-folder-container">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Folder Name:
            <input
              onChange={e => this.getFolderTitle(e.target.value)}
              type="text"
              id="title"
              name="title"
              defaultValue="Untitled Folder"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={this.props.history.goBack}>Go Back</button>
      </div>
    );
  }
}
