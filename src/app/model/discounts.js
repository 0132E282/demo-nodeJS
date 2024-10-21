const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Discounts = new Schema({
    name: { type: String, required:true , index: true }, 

});
module.exports = mongoose.model('Discounts', Discounts);