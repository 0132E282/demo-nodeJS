const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Category = new Schema({
    name: { type: String, required:true , index: true },
    slug: { type: String, min: 5, max: 60, required: true},
    thumb: { type: String},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
Category.index({ name: 'text'});
module.exports = mongoose.model('Category', Category);