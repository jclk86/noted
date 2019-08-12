import React from "react";
import { NavLink } from "react-router-dom";
import Context from "../context";
import Config from "../config";
import { format } from "date-fns";
import "./Note.css";
import PropTypes from "prop-types";

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
  // added note_name, modified_date
  render() {
    return (
      <li
        key={this.props.note.id}
        style={{ listStyle: "none" }}
        className="note-item"
      >
        <h2 className="note-title">
          <NavLink to={`/note/${this.props.note.id}`} key={this.props.note.id}>
            {this.props.note.note_name}
          </NavLink>
        </h2>
        <p className="date">
          Modified: {format(this.props.note.modified_date, "Do MMM YYYY")}
        </p>

        <button type="button" onClick={this.handleDelete}>
          DELETE
        </button>
      </li>
    );
  }
}

Note.defaultProps = {
  note: {}
};

Note.propTypes = {
  noteId: PropTypes.string
};
