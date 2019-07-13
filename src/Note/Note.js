import React from "react";
import Context from "../context";
import { findNote } from "../helper-functions";

export default class Note extends React.Component {
  static contextType = Context;
  render() {
    const note = findNote(this.context.notes, this.props.match.params.noteId);
    return (
      <div>
        <h1>{note.name}</h1>
        <p>{note.content}</p>
        <button onClick={this.props.history.goBack}>Go Back</button>
      </div>
    );
  }
}
