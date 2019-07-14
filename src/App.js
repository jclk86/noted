import React from "react";
import "./App.css";
import Context from "./context";
import { Route, Link, withRouter } from "react-router-dom";
import Config from "./config";
import Folders from "./Folders/Folders";
import NotesListMain from "./NotesListMain/NotesListMain";
import NoteContent from "./NoteContent/NoteContent";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    };
  }
  static contextType = Context;

  addFolder = folder => {
    this.setState({ folders: [...this.state.folders, folder] });
    console.log(this.state.folders);
  };

  addNote = note => {
    this.setState({ notes: [...this.state.notes, note] });
    console.log(this.state.notes);
  };

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${Config.API_ENDPOINT}/folders`),
      fetch(`${Config.API_ENDPOINT}/notes`)
    ])
      .then(([foldersRes, notesRes]) => {
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        return Promise.all([foldersRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({ folders: folders });
        this.setState({ notes: notes });
        console.log(this.state.notes);
      })
      .catch(err => console.error(err));
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote
    };
    return (
      <div className="App">
        <header>
          <h1 className="app-header">
            <Link to="/">Noted</Link>
          </h1>
        </header>
        <Context.Provider value={contextValue}>
          <div className="sidebar flex">
            <Route exact path="/" component={Folders} />
            <Route exact path="/folder/:folderId" component={Folders} />
          </div>
          <main>
            <Route exact path="/" component={NotesListMain} />
            <Route exact path="/folder/:folderId" component={NotesListMain} />
          </main>
          <Route exact path="/note/:noteId" component={NoteContent} />
          <Route exact path="/add-folder" component={AddFolder} />
          <Route exact path="/add-note" component={AddNote} />
        </Context.Provider>
      </div>
    );
  }
}

export default withRouter(App);
