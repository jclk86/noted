import React from "react";
import "./App.css";
import Context from "./context";
import { Route, Link, withRouter } from "react-router-dom";
import Config from "./config";
import Folders from "./Folders/Folders";
import EditFolder from "./editFolder/EditFolder";

import EditNote from "./editNote/EditNote";
import NotesListMain from "./NotesListMain/NotesListMain";
import NoteContent from "./NoteContent/NoteContent";
import AddFolder from "./AddFolder/AddFolder";
import AddNote from "./AddNote/AddNote";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      error: null
    };
  }
  static contextType = Context;

  setNote = note => {
    this.setState({
      note,
      error: null
    });
  };

  setFolder = folder => {
    this.setState({
      folder,
      error: null
    });
  };

  addFolder = folder => {
    this.setState({ folders: [...this.state.folders, folder] });
    console.log(this.state.folders);
  };

  addNote = note => {
    this.setState({ notes: [...this.state.notes, note] });
    console.log(this.state.notes);
  };

  deleteNote = noteId => {
    // should i add Number()
    this.setState({
      notes: this.state.notes.filter(note => note.id !== parseInt(noteId))
    });
  };

  deleteFolder = folderId => {
    this.setState({
      folders: this.state.folders.filter(
        folder => folder.id !== parseInt(folderId)
      ),
      notes: this.state.notes.filter(note => note.folder !== parseInt(folderId))
    });
    console.log(this.state.folders);
  };
  // refactor fetch headers
  componentDidMount() {
    Promise.all([
      fetch(`${Config.API_ENDPOINT}/api/folders`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Config.API_KEY}`
        }
      }),
      fetch(`${Config.API_ENDPOINT}/api/notes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Config.API_KEY}`
        }
      })
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
      })
      .catch(err => console.error(err));
  }

  updateNote = updatedNote => {
    this.setState({
      notes: this.state.notes.map(
        note => (note.id !== updatedNote.id ? note : updatedNote) //parseInt?
      )
    });
  };

  updateFolder = updatedFolder => {
    this.setState({
      folders: this.state.folders.map(folder =>
        folder.id !== updatedFolder.id ? folder : updatedFolder
      )
    });
    console.log(this.state.folders);
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
      updateFolder: this.updateFolder,
      updateNote: this.updateNote
    };
    return (
      <div className="App">
        <header>
          <h1 className="app-header">
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <Context.Provider value={contextValue}>
          <div className="sidebar flex">
            <ErrorBoundary>
              <Route exact path="/" component={Folders} />
              <Route exact path="/folders/:folderId" component={Folders} />
            </ErrorBoundary>
          </div>
          <main>
            <ErrorBoundary>
              <Route exact path="/" component={NotesListMain} />
              <Route
                exact
                path="/folders/:folderId"
                component={NotesListMain}
              />
            </ErrorBoundary>
          </main>
          <ErrorBoundary>
            <Route exact path="/notes/:noteId" component={NoteContent} />
          </ErrorBoundary>
          <ErrorBoundary>
            <Route exact path="/add-folder" component={AddFolder} />
            <Route exact path="/edit-folder/:folderId" component={EditFolder} />
            <Route exact path="/edit-note/:noteId" component={EditNote} />
            <Route exact path="/add-note" component={AddNote} />
          </ErrorBoundary>
        </Context.Provider>
      </div>
    );
  }
}

export default withRouter(App);
// things to add above editFolder and editNote route
