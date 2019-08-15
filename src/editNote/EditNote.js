import React, { Component } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import Config from "../config";
import { withRouter } from "react-router-dom";
import ValidationError from "../ValidationError";

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note_name: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        filled: false
      },
      folder: {
        value: "",
        chosen: false
      },
      modified_date: ""
    };
  }
  static contextType = Context;

  componentDidMount() {
    const { noteId } = this.props.match.params;
    fetch(`${Config.API_ENDPOINT}/api/notes/${noteId}`, {
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
          note_name: {
            value: resData.note_name
          },
          content: {
            value: resData.content
          }
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({ e });
      });
  }

  validateName = fieldValue => {
    const name = this.state.note_name.value.trim();
    if (name.length === 0) {
      return "Please enter a name for the note";
    } else if (name.length < 3 || name.length > 20) {
      return "Note name should be between 3 and 20 characters";
    }
  };

  validateContent = fieldValue => {
    const content = this.state.content.value;
    if (content === "") {
      return "Please enter content";
    }
  };

  validateFolderId = fieldValue => {
    const folderId = this.state.folder.chosen;
    if (folderId === false) {
      return "Please select a folder";
    }
  };

  getTitle = name => {
    this.setState({
      note_name: { value: name, touched: true }
    });
  };

  getContent = content => {
    this.setState({
      content: { value: content, filled: true }
    });
  };

  getFolderId = folderId => {
    this.setState({
      folder: {
        value: folderId,
        chosen: true
      }
    });
  };

  isFormValid = () => {
    const { note_name, content, folder } = this.state;
    return note_name.value && content.value && folder.chosen;
  };

  handleSubmit = event => {
    event.preventDefault();
    const { noteId } = this.props.match.params;
    const note = {
      id: parseInt(noteId),
      note_name: event.target.note_name.value,
      folder: parseInt(event.target.folder.value),
      content: event.target.content.value,
      modified_date: new Date()
    };
    fetch(`${Config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
      })
      .then(() => {
        this.context.updateNote(note);
        this.props.history.goBack();
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const valid = this.isFormValid();
    const { note_name, content } = this.state;
    return (
      <div className="edit-note-container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="edit-name-container">
            <label htmlFor="edit name" className="edit-note-label" /> Edit
            Title:
            <input
              type="text"
              id="note_name"
              name="note_name"
              placeholder="My To Dos"
              defaultValue={note_name.value}
              onChange={e => this.getTitle(e.target.value)}
            />
          </div>
          {this.state.note_name.chosen && (
            <ValidationError message={this.validateName()} />
          )}
          <div className="add-content-container">
            <label className="add-content-label" htmlFor="add content" /> Add
            Content:
            <textarea
              id="content"
              name="content"
              value={content.value}
              onChange={e => this.getContent(e.target.value)}
            />
            {!content.value && (
              <ValidationError message={this.validateContent()} />
            )}
          </div>
          <select
            name="folder"
            onChange={e => this.getFolderId(e.target.value)}
          >
            <option>Select Folder</option>
            {this.context.folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.folder_name}
              </option>
            ))}
          </select>
          {this.state.folder.chosen === false && (
            <ValidationError message={this.validateFolderId()} />
          )}
          <div className="button-container">
            <button type="submit" disabled={!valid}>
              Submit
            </button>
          </div>
          <div className="note-return-button">
            <button type="button" onClick={this.props.history.goBack}>
              Go Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditNote.propTypes = {
  noteId: PropTypes.number,
  note_name: PropTypes.string,
  content: PropTypes.string
};

export default withRouter(EditNote);
