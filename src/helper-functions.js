export const getNotesForFolders = (notes, foldersId) => {
  return !foldersId ? notes : notes.filter(note => note.folderId === foldersId);
};

export const findNote = (notes, noteId) => {
  const note = notes.find(note => note.id === noteId);
  return note;
};

export const numOfNotes = (notes, folderId) => {
  return notes.filter(note => note.folderId === folderId).length;
};
