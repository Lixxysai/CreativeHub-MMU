const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,    
        trim: true

    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        
    },

    friends: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    friendrequests: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('User', Userschema);
