const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    author: { 
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    date_time: {
        type: String,
        default: () => new Date().toLocaleString()
    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes: {
        type: Number,
        default: 0
    },

    comments: [
        {
            author: { 
                type: String,
                required: true
            },
            text: {
                type: String,
            },
            date_time: {
                type: String,
                default: () => new Date().toLocaleString()  
            }
        }
    ]
});


module.exports = mongoose.model('Post', postSchema);
