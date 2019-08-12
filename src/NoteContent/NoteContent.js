import React from "react";
import Context from "../context";
import { findNote, notesArray } from "../helper-functions";
import "./NoteContent.css";
import PropTypes from "prop-types";

export default class NoteContent extends React.Component {
  static contextType = Context;
  render() {
    // const note = findNote(this.context.notes, this.props.match.params.noteId);
    console.log(this.context.notes);
    return (
      <div className="note-content-wrapper">
        <header className="note-header">
          <h3 className="note-title">{}</h3>
        </header>
        <p>{}</p>
        <div className="return-btn-container">
          <button onClick={this.props.history.goBack} className="return-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

NoteContent.defaultProps = {
  notes: []
};

NoteContent.propTypes = {
  noteId: PropTypes.string
};
