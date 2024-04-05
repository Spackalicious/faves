var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const sequenceGenerator = require("./sequenceGenerator");
const Author = require("../models/author");

router.get('/', (req, res, next) => {
    Author.find()
    .populate('books')
    .then((authors) => {
        res.status(200).json({
            message: "Retrieved authors from the database.",
            authors: authors,
        });
        // console.log("The authors in the DB are: " + authors);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error retrieving authors from the database.",
            error: err
        });
    });
    // console.log('MONGODB RETURNS THESE AUTHORS: ' + authors);
});

router.post('/', async (req, res, next) => {
    try {
        const maxAuthorId = await sequenceGenerator.nextId('authors');
        const author = new Author({
            id: maxAuthorId,
            name: req.body.name
        });
        console.log(author);
        const newAuthor = await author.save();
        res.status(201).json({
            message: 'Success adding author!',
            author: newAuthor
        });
    } catch (error) {
        res.status(500).json({
            message: "There was a problem creating the author.",
            error: error.message
        });
        console.log("NEW AUTHOR ERROR MESSAGE IS: " + error.message);
    }
});

router.put('/:id', (req, res, next) => {
    Author.findOne({ id: req.params.id })
      .then(author => {
        author.name = req.body.name;
        author.books = req.body.books;
  
        Author.updateOne({ id: req.params.id }, author)
        .then(result => {
        res.status(204).json({
            message: 'Author updated successfully'
        })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred while updating the author.',
            error: error
        });
        });
    })
    .catch(error => {
    res.status(404).json({
        message: 'Author not found.',
        error: error
    });
    });
});

router.delete("/:id", (req, res, next) => {
    Author.findOne({ id: req.params.id })
        .then(author => {
            Author.deleteOne({ id: req.params.id })
            .then(result => {
            res.status(204).json({
                message: "Author deleted successfully"
            });
            })
            .catch(error => {
                res.status(500).json({
                message: 'An error occurred',
                error: error
            });
            })
        })
        .catch(error => {
        res.status(404).json({
            message: 'Author not found.',
            error: error
        });
    });
});

module.exports = router; 
