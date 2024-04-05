var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const sequenceGenerator = require("./sequenceGenerator");
const Book = require("../models/book");

router.get('/', (req, res, next) => {
    Book.find()
    // .populate('author')
    .then((books) => {
        res.status(200).json({
            message: "Retrieved books from the database.",
            books: books,
        });
        // console.log("The books in the DB are: " + books);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error retrieving books from the database.",
            error: err
        });
        // console.log("ROUTER GET BOOKS ERROR IS: " + error.message);
    });
});

router.post('/', async (req, res, next) => {
    try {
        const maxBookId = await sequenceGenerator.nextId('books');
        const book = new Book({
            id: maxBookId,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            imgURL: req.body.imgURL,
            myReview: req.body.myReview
        });
        console.log(book);
        const newBook = await book.save();
        res.status(201).json({
            message: 'Success adding book!',
            book: newBook
        });
    } catch (error) {
        res.status(500).json({
            message: "There was a problem creating the book.",
            error: error.message
        });
        console.log("NEW Book ERROR MESSAGE IS: " + error.message);
    }
});

router.put('/:id', (req, res, next) => {
    Book.findOne({ id: req.params.id })
      .then(book => {
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.imgURL = req.body.imgURL;
        book.myReview = req.body.myReview;
  
        Book.updateOne({ id: req.params.id }, book)
        .then(result => {
        res.status(204).json({
            message: 'Book updated successfully'
        })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred while updating the book.',
            error: error
        });
        });
    })
    .catch(error => {
    res.status(404).json({
        message: 'Book not found.',
        error: error
    });
    });
});

router.delete("/:id", (req, res, next) => {
    Book.findOne({ id: req.params.id })
        .then(book => {
            Book.deleteOne({ id: req.params.id })
            .then(result => {
            res.status(204).json({
                message: "Book deleted successfully"
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
            message: 'Book not found.',
            error: error
        });
    });
});

module.exports = router; 
