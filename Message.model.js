const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { 
        type: String,
        required: true
    },
    
    message: {
        type: String,
        required: true
    },
    date_time: {
        type: String,
        default: () => new Date().toLocaleString()
    }
});

module.exports = mongoose.model('Message', messageSchema);
