const Sequence = require('../models/sequence');
var maxSongId;
// var maxMessageId;
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
            // this.maxMessageId = sequence.maxMessageId;
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
                this.maxSongId++;
                updateObject = { maxSongId: this.maxSongId };
                nextId = this.maxSongId;
                break;
            // case 'messages':
            //     // console.log("Current maxMessageId: " + maxMessageId);
            //     this.maxMessageId++;
            //     // console.log("New maxMessageId: " + maxMessageId);
            //     updateObject = { maxMessageId: this.maxMessageId };
            //     nextId = this.maxMessageId;
            //     break;
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