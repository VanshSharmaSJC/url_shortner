const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
ShortId: {
    type: String,
    required: true,
    unique: true, 
},
redirectURL:{
    type: String,
    required: true,
},
visitHistory: [
    {timestamp: {type:Number}}],
},
{timestamps: true}
);

const URL = mongoose.model('url',urlSchema); 

module.exports = URL;