var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dairy = new Schema({  
    date: { type: Date},   
    label: { type: String},
    text: { type: String}
});

module.exports = mongoose.model('Dairy', Dairy);