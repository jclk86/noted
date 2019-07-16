import React from "react";
import Context from "../context";
import "./Folders.css";
import { NavLink } from "react-router-dom";
import { numOfNotes } from "../helper-functions";

export default class Folders extends React.Component {
  static contextType = Context;

  render() {
    return (
      <ul className="foldersList">
        {this.context.folders.map(folder => (
          <li key={folder.id} style={{ listStyle: "none" }}>
            <NavLink
              to={`/folder/${folder.id}`}
              activeClassName="active"
              className="folder-links"
            >
              {folder.name}{" "}
            </NavLink>
            <p>{numOfNotes(this.context.notes, folder.id)}</p>
          </li>
        ))}
        <NavLink to="/add-folder">
          <button>+ Add Folder</button>
        </NavLink>
      </ul>
    );
  }
}

Folders.defaultProps = {
  folders: [],
  notes: []
};
