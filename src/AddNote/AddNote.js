import React from "react";
import "./AddNote.css";
import Context from "../context";
import Config from "../config";
import ValidationError from "../ValidationError";

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        filled: false
      },
      folderId: {
        value: null,
        chosen: false
      },
      modified: new Date()
    };
  }
  static contextType = Context;

  validateName = fieldValue => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Please enter a name for the note";
    } else if (name.length < 3 || name.length > 20) {
      return "Note name should be between 3 and 20 characters";
    }
  };

  validateContent = fieldValue => {
    const content = this.state.content.value;
    if (content.length === 0) {
      return "Please enter content";
    }
  };

  getTitle = name => {
    this.setState({
      name: { value: name, touched: true }
    });
  };

  getContent = content => {
    this.setState({
      content: { value: content, filled: true }
    });
  };

  getFolderId = folderId => {
    this.setState({
      folderId: {
        value: folderId,
        chosen: true
      }
    });
  };
  // add body: JSON.stringify
  handleSubmit = event => {
    event.preventDefault();
    const note = {
      name: event.target.name.value,
      modified: this.state.modified,
      folderId: event.target.folderId.value,
      content: event.target.content.value
    };
    fetch(`${Config.API_ENDPOINT}/notes`, {
      method: "post",
      body: JSON.stringify(note),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Oops... Something went wrong");
        }
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.goBack();
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    return (
      <div className="add-note-container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="add-name-container">
            <label htmlFor="add name" className="add-note-label" /> Add Title:
            <input
              type="text"
              id="name"
              name="name"
              placeholder="My To Dos"
              onChange={e => this.getTitle(e.target.value)}
            />
          </div>
          {this.state.name.touched && (
            <ValidationError message={this.validateName()} />
          )}
          <div className="add-content-container">
            <label className="add-content-label" htmlFor="add content" /> Add
            Content:
            <textarea
              id="content"
              name="content"
              placeholder="...buy groceries"
              onChange={e => this.getContent(e.target.value)}
            />
          </div>
          <select
            name="folderId"
            onChange={e => this.getFolderId(e.target.value)}
          >
            <option value={null}>Select Folder</option>
            {this.context.folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
          <div>
            <button type="button" onClick={this.props.history.goBack}>
              Go Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
