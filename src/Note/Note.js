import React from "react";
import { NavLink } from "react-router-dom";
import Context from "../context";
import Config from "../config";
import { format } from "date-fns";
import "./Note.css";
import PropTypes from "prop-types";

function deleteNoteRequest(noteId, cb) {
  fetch(`${Config.API_ENDPOINT}/api/notes/${noteId}`, {
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
      console.log(noteId);
      cb(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}

export default function NoteItem(props) {
  return (
    <Context.Consumer>
      {context => (
        <li
          key={props.note.id}
          style={{ listStyle: "none" }}
          className="note-item"
        >
          <h2 className="note-title">
            <NavLink to={`/notes/${props.note.id}`} key={props.note.id}>
              {props.note.note_name}
            </NavLink>
          </h2>
          <p className="date">
            Modified: {format(props.note.modified_date, "Do MMM YYYY")}
          </p>

          <button
            type="button"
            onClick={() => deleteNoteRequest(props.note.id, context.deleteNote)}
          >
            DELETE
          </button>
        </li>
      )}
    </Context.Consumer>
  );
}

NoteItem.defaultProps = {
  onClickDelete: () => {}
};

NoteItem.defaultProps = {
  note: {}
};

NoteItem.propTypes = {
  noteId: PropTypes.number
};
