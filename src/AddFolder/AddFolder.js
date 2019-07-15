import React, { Component } from "react";
import Config from "../config";
import Context from "../context";
import ValidationError from "../ValidationError";
import "./AddFolder.css";

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

  validateTitle = fieldValue => {
    const title = this.state.folder.value.trim();
    if (title.length === 0) {
      return "Please enter a title";
    } else if (title.length < 3 || title.length > 20) {
      return "Title must be be between 3 and 20 characters long";
    }
  };

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
          <label htmlFor="folder name">Folder Name:</label>
          <input
            onChange={e => this.getFolderTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
            defaultValue="Untitled Folder"
          />
          <button type="submit" disabled={this.validateTitle()}>Submit</button>{" "}
          <div className="return-button-container">
            <button
              onClick={this.props.history.goBack}
              type="button"
              className="return-button"
            >
              Go Back
            </button>
          </div>
        </form>
        {this.state.folder.touched && (
          <ValidationError message={this.validateTitle()} />
        )}
      </div>
    );
  }
}
