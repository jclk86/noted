import React from "react";
import "./AddNote.css";
import Context from "../context";
import Config from "../config";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        name: {
          value: "",
          touched: false
        },
        content: {
          value: "",
          touched: false
        },
        modified: "",
        folderId: null,
        touched: false
      }
    };
  }
  static contextType = Context;

  getTitle = name => {
    this.setState({
      note: { name: name, touched: true }
    });
  };

  getContent = content => {
    this.setState({
      note: { content: content, touched: true }
    });
  };

  getFolderId = folderId => {
    this.setState({
      note: {
        folderId: folderId,
        touched: true
      }
    });
  };
  // add body: JSON.stringify
  handleSubmit = event => {
    event.preventDefault();
    const note = {
      name: event.target.name.value,
      modified: new Date(),
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
        return res;
      })
      .then(res => {
        res.json();
      })
      .then(notes => {
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
          <div>
            <label>
              {" "}
              Add Title:
              <input
                type="text"
                id="name"
                name="name"
                placeholder="My To Dos"
                onChange={e => this.getTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Add Content:
              <textarea
                id="content"
                name="content"
                placeholder="...buy groceries"
                onChange={e => this.getContent(e.target.value)}
              />
            </label>
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
        </form>
      </div>
    );
  }
}
