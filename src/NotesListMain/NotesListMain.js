import React from "react";
import { getNotesForFolders, check } from "../helper-functions";
import Context from "../context";
import { NavLink } from "react-router-dom";
import Note from "../Note/Note";
import "./NotesListMain.css";
import PropTypes from "prop-types"

export default class NotesListMain extends React.Component {
  static contextType = Context;

  render() {
    const notesForFolder = getNotesForFolders(
      this.context.notes,
      this.props.match.params.folderId
    );
    return (
      <ul>
        {notesForFolder.map(note => (
          <Note key={note.name} note={note} />
        ))}
        <div className="add-note-wrapper">
          <NavLink to="/add-note">
            <button className="add-note-btn">+ Add Note</button>
          </NavLink>
        </div>
      </ul>
    );
  }
}

NotesListMain.defaultProps = {
  notes: []
}

NotesListMain.propTypes = {
  folderId: PropTypes.string
};