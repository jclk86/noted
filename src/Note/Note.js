import React from "react";
import { NavLink } from "react-router-dom";
import Context from "../context";
import Config from "../config";
import { format } from "date-fns";
import "./Note.css";

export default class Note extends React.Component {
  static contextType = Context;

  handleDelete = e => {
    const noteId = this.props.note.id;
    fetch(`${Config.API_ENDPOINT}/notes/${noteId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch(e => console.error(e));
  };

  render() {
    return (
      <li
        key={this.props.note.id}
        style={{ listStyle: "none" }}
        className="note-item"
      >
        <h2 className="note-title">
          <NavLink to={`/note/${this.props.note.id}`} key={this.props.note.id}>
            {this.props.note.name}
          </NavLink>
        </h2>
        <p className="date">
          Modified: {format(this.props.note.modified, "Do MMM YYYY")}
        </p>

        <button type="button" onClick={this.handleDelete}>
          DELETE
        </button>
      </li>
    );
  }
}
