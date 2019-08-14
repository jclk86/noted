import React from "react";
import Context from "../context";
import "./Folders.css";
import Config from "../config";
import { NavLink } from "react-router-dom";
import { numOfNotes } from "../helper-functions";

export default class Folders extends React.Component {
  static contextType = Context;

  deleteFolderRequest = (folderId, cb) => {
    fetch(`${Config.API_ENDPOINT}/api/folders/${folderId}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(data => {
        cb(folderId);
        this.props.history.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log(this.context.folders);
    return (
      <ul className="foldersList">
        {this.context.folders.map(folder => (
          <li key={folder.id} style={{ listStyle: "none" }}>
            <NavLink
              to={`/folders/${folder.id}`}
              activeClassName="active"
              className="folder-links"
            >
              {folder.folder_name}{" "}
            </NavLink>
            <p>{numOfNotes(this.context.notes, folder.id)}</p>
          </li>
        ))}
        <NavLink to="/add-folder">
          <button>+ Add Folder</button>
        </NavLink>
        {!this.props.match.params.folderId ? null : (
          <NavLink to={`/edit-folder/${this.props.match.params.folderId}`}>
            <button>Edit Folder</button>
          </NavLink>
        )}
        <button
          disabled={!this.props.match.params.folderId}
          className="delete-folder-btn"
          type="button"
          onClick={() =>
            this.deleteFolderRequest(
              this.props.match.params.folderId,
              this.context.deleteFolder
            )
          }
        >
          DELETE FOLDER
        </button>
      </ul>
    );
  }
}

Folders.defaultProps = {
  onClickDelete: () => {}
};

Folders.defaultProps = {
  folders: [],
  notes: []
};
