import React from "react";
import { getNotesForFolders, check } from "../helper-functions";
import Context from "../context";
import { NavLink } from "react-router-dom";

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
          <li key={note.id} style={{ listStyle: "none" }}>
            <NavLink to={`/note/${note.id}`}>{note.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }
}
