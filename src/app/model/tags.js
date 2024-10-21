const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Tags = new Schema({
    name: { type: String, required:true , index: true },
    slug: { type: String},
});
module.exports = mongoose.model('tags', Tags);