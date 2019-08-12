export const getNotesForFolders = (notes, foldersId) => {
  const folderIdNum = Number(foldersId);
  return !foldersId ? notes : notes.filter(note => note.folder === folderIdNum);
};

export const findNote = (notes, noteId) => {
  const noteIdNum = Number(noteId);
  const note = notes.find(note => note.id === noteIdNum);
  console.log(note);
  return note;
};

export const numOfNotes = (notes, folderId) => {
  return notes.filter(note => note.folder === folderId).length;
};

export const notesArray = notes => {
  console.log(notes);
};
