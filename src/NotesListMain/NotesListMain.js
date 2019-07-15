import React from "react";
import { getNotesForFolders } from "../helper-functions";
import Context from "../context";
import { NavLink, withRouter } from "react-router-dom";
import Note from "../Note/Note";
import "./NotesListMain.css";
import PropTypes from "prop-types";

class NotesListMain extends React.Component {
  static contextType = Context;

  render() {
    const notesForFolder = getNotesForFolders(
      this.context.notes,
      this.props.match.params.folderId
    );
    console.log(this.props);
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
};

NotesListMain.propTypes = {
  folderId: PropTypes.string
};

export default withRouter(NotesListMain);
