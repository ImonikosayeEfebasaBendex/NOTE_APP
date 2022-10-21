module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    //create a new Note
    app.post('/note', notes.create);

    //retrieve all Notes
    app.get('/notes', notes.findAll);

    //retrieve a single Notes with NotesID
    app.get('/notes/:noteId/notes', notes.findOne);

    //update a Note with NoteId
    app.put('/note/:noteId', notes.update);

    //delete a Note with noteId
    app.delete('/note/:noteId', notes.delete);
}