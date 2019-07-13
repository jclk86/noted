import React from "react";
import Context from "../context";
import "./Folders.css";
import { NavLink } from "react-router-dom";
import { check } from "../helper-functions";

export default class Folders extends React.Component {
  static contextType = Context;

  render() {
    return (
      <ul className="foldersList">
        {this.context.folders.map(folder => (
          <li key={folder.id} style={{ listStyle: "none" }}>
            <NavLink to={`/folder/${folder.id}`} activeClassName="active">
              {folder.name}{" "}
            </NavLink>
          </li>
        ))}
        <NavLink to="/add-folder">
          <button>+ Add Folder</button>
        </NavLink>
      </ul>
    );
  }
}
