import React from "react";
import "./App.css";
import Context from "./context";
import { Route, NavLink } from "react-router-dom";
import Config from "./config";
import Folders from "./Folders/Folders";
import NotesListMain from "./NotesListMain/NotesListMain";
import Note from "./Note/Note";
import AddFolder from "./AddFolder/AddFolder";

export default class App extends React.Component {
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
      })
      .catch(err => console.error(err));
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder
    };
    return (
      <div className="App">
        <header>
          <h1>
            <NavLink to="/">Noted</NavLink>
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
          <Route exact path="/note/:noteId" component={Note} />
          <Route exact path="/add-folder" component={AddFolder} />
        </Context.Provider>
      </div>
    );
  }
}
