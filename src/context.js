import React from "react";

export default React.createContext({
  notes: [],
  folders: [],
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
  deleteFolder: () => {},
  updateNote: () => {},
  updateFolder: () => {}
});
