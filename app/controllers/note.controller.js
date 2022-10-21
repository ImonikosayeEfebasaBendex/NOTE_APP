const Note = require('../models/note.module.js');

//create and save a new note
exports.create = (req, res) => {
    //validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "note content cannot be empty"
        })
    }

    //Create a note
    const note = new Note({
        title: req.body.title || "untitled Note",
        content: req.body.content
    });

    //save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occur while creating the note."
        })
    })
}

//reteieve and return all notes from the data base
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occured while reteiving notes."
        });
    });
};

//find a single note with a noteID
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "note not found with ID" + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

//update a note identified by the notreID in the request
exports.update = (req, res) => {
    //validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "note content cannot be empty"
        })
    }

    //find a note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

//delete a note with the specified noteID in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            })
        }
        res.send({message: "note deleted successfully"})
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === "NotFound") {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Note not  found with id " + req.params.noteId
        });
    });
};