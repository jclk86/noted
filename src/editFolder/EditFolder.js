import React, { Component } from "react";
import Config from "../config";
import Context from "../context";
import ValidationError from "../ValidationError";
import { withRouter } from "react-router-dom";
import "./EditFolder.css";
import PropTypes from "prop-types";
import NoteContent from "../NoteContent/NoteContent";

class EditFolder extends React.Component {
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

  componentDidMount() {
    const { folderId } = this.props.match.params;
    fetch(`${Config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Config.API_KEY}`,
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          folder: { value: resData.folder_name }
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleSubmit = e => {
    e.preventDefault();

    const folder_name = e.target.title.value;

    const { folderId } = this.props.match.params;
    const newFolder = { id: parseInt(folderId), folder_name };

    fetch(Config.API_ENDPOINT + `/api/folders/${folderId}`, {
      method: "PATCH",
      body: JSON.stringify(newFolder),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(() => {
        this.context.updateFolder(newFolder);
        this.props.history.goBack();
      });
  };

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

  isFormValid = () => {
    const { folder } = this.state;
    return folder.touched ? true : false;
  };

  render() {
    const { folder } = this.state;
    const isValid = this.isFormValid();
    return (
      <div className="edit-folder-container">
        <form onSubmit={event => this.handleSubmit(event)}>
          <label htmlFor="folder name">Folder Name:</label>
          <input
            onChange={e => this.getFolderTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
            value={folder.value}
          />
          <button type="submit" disabled={!isValid}>
            Submit
          </button>{" "}
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
        {!this.state.folder.value && (
          <ValidationError message={this.validateTitle()} />
        )}
      </div>
    );
  }
}

EditFolder.propTypes = {
  folderId: PropTypes.number,
  folder_name: PropTypes.string
};

export default withRouter(EditFolder);
