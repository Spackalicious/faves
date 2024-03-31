var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const sequenceGenerator = require("./sequenceGenerator");
const Song = require("../models/song");

router.get('/', (req, res, next) => {
    Song.find()
    .populate('comments')
    .then((songs) => {
        res.status(200).json({
            message: "Retrieved songs from the database.",
            songs: songs,
        });
        // console.log("The songs in the DB are: " + songs);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error retrieving songs from the database.",
            error: err
        });
    });
    // console.log('MONGODB RETURNS THESE SONGS: ' + songs);
});

router.post('/', async (req, res, next) => {
    try {
        const maxSongId = await sequenceGenerator.nextId('songs');
        const song = new Song({
            id: maxSongId,
            title: req.body.title,
            artist: req.body.artist,
            ytLink: req.body.ytLink
        });
        console.log(song);
        const newSong = await song.save();
        res.status(201).json({
            message: 'Success adding song!',
            song: newSong
        });
    } catch (error) {
        res.status(500).json({
            message: "There was a problem creating the song.",
            error: error.message
        });
        console.log("NEW SONG ERROR MESSAGE IS: " + error.message);
    }
});

router.put('/:id', (req, res, next) => {
    Song.findOne({ id: req.params.id })
      .then(song => {
        song.title = req.body.title;
        song.artist = req.body.artist;
        song.ytLink = req.body.ytLink;
        // song.comment = req.body.comment;
  
        Song.updateOne({ id: req.params.id }, song)
        .then(result => {
        res.status(204).json({
            message: 'Song updated successfully'
        })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred while updating the song.',
            error: error
        });
        });
    })
    .catch(error => {
    res.status(404).json({
        message: 'Song not found.',
        error: error
    });
    });
});

router.delete("/:id", (req, res, next) => {
    Song.findOne({ id: req.params.id })
        .then(song => {
            Song.deleteOne({ id: req.params.id })
            .then(result => {
            res.status(204).json({
                message: "Song deleted successfully"
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
            message: 'Song not found.',
            error: error
        });
    });
});

module.exports = router; 
