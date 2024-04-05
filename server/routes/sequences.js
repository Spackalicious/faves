var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const sequenceGenerator = require("./sequenceGenerator");
const Sequence = require("../models/sequence");

router.get('/', (req, res, next) => {
    Sequence.find()
    .then((sequences) => {
        res.status(200).json({
            message: "Retrieved sequences from the database.",
            sequences: sequences,
        });
        // console.log("The sequences in the DB are: " + sequences);
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error retrieving sequences from the database.",
            error: err
        });
    });
    // console.log('MONGODB RETURNS THESE SEQUENCES: ' + sequences);
});

// router.post('/', async (req, res, next) => {
//     try {
//         const maxSequenceId = await sequenceGenerator.nextId('sequences');
//         const sequence = new Sequence({
//             id: maxSequenceId,
//             title: req.body.title,
//             artist: req.body.artist,
//             ytLink: req.body.ytLink
//         });
//         console.log(sequence);
//         const newSequence = await sequence.save();
//         res.status(201).json({
//             message: 'Success adding sequence!',
//             sequence: newSequence
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "There was a problem creating the sequence.",
//             error: error.message
//         });
//         console.log("NEW SEQUENCE ERROR MESSAGE IS: " + error.message);
//     }
// });

// router.put('/:id', (req, res, next) => {
//     Sequence.findOne({ id: req.params.id })
//       .then(sequence => {
//         sequence.title = req.body.title;
//         sequence.artist = req.body.artist;
//         sequence.ytLink = req.body.ytLink;
//         // sequence.comment = req.body.comment;
  
//         Sequence.updateOne({ id: req.params.id }, sequence)
//         .then(result => {
//         res.status(204).json({
//             message: 'Sequence updated successfully'
//         })
//         })
//         .catch(error => {
//             res.status(500).json({
//             message: 'An error occurred while updating the sequence.',
//             error: error
//         });
//         });
//     })
//     .catch(error => {
//     res.status(404).json({
//         message: 'Sequence not found.',
//         error: error
//     });
//     });
// });

// router.delete("/:id", (req, res, next) => {
//     Sequence.findOne({ id: req.params.id })
//         .then(sequence => {
//             Sequence.deleteOne({ id: req.params.id })
//             .then(result => {
//             res.status(204).json({
//                 message: "Sequence deleted successfully"
//             });
//             })
//             .catch(error => {
//                 res.status(500).json({
//                 message: 'An error occurred',
//                 error: error
//             });
//             })
//         })
//         .catch(error => {
//         res.status(404).json({
//             message: 'Sequence not found.',
//             error: error
//         });
//     });
// });

module.exports = router; 
