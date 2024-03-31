const Sequence = require('../models/sequence');
var maxSongId;
var maxBookId;
// var maxContactId;
var sequenceId = null;

const sequenceGenerator = {   
    async init() {    
        try {
            const sequence = await Sequence.findOne({}).exec();   
            if (!sequence) {
                throw new Error('Sequence not found');
            }
            this.sequenceId = sequence._id;
            this.maxSongId = sequence.maxSongId;
            this.maxBookId = sequence.maxBookId;
            // this.maxContactId = sequence.maxContactId;
            } catch (err) {
                console.error('Error initializing SequenceGenerator:', err);
                throw err;
            }
        },



    async nextId(collectionType) {
        console.log("The CollectionType is: " + collectionType);
        if (!this.sequenceId) {
            await this.init();
        }
        let updateObject = {};
        let nextId;
    
        // try {
            switch (collectionType.toLowerCase()) {
            case 'songs':
                console.log("Original maxSongId: " + maxSongId);
                this.maxSongId++;
                console.log("New maxSongId: " + maxSongId);
                updateObject = { maxSongId: this.maxSongId };
                nextId = this.maxSongId;
                break;
            case 'books':
                console.log("Current maxBookId: " + maxBookId);
                this.maxBookId++;
                console.log("New maxBookId: " + maxBookId);
                updateObject = { maxBookId: this.maxBookId };
                nextId = this.maxBookId;
                break;
            // case 'contacts':
            //     // console.log("Current maxContactId: " + maxContactId);
            //     this.maxContactId++;
            //     // console.log("Current maxContactId: " + maxContactId);
            //     updateObject = { maxContactId: this.maxContactId };
            //     nextId = this.maxContactId;
            //     break;
            default:
            //   return -1;
            throw new Error('Not a valid collection type');
        }
        try {
            await Sequence.updateOne({_id: sequenceId}, {$set: updateObject}).exec();
            return nextId;
    //      }
     // // }     
   
     // // try {
     } catch (error) {
      console.log("THE SEQUENCE GENERATOR ERROR: " + error);
      throw error;
     // return null;
     }
}  
}

module.exports = sequenceGenerator;