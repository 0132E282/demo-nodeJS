const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Products = new Schema({
    name: { type: String, required:true , index: true },
    slug: { type: String, min: 5, max: 60, required: true},
    description: { type: String, min: 5, max: 40, required: true},
    thumbnail: { type: String},
    images: [{ type: String }],
    reviews: [{ type: ObjectId, ref:'reviews', required: false }],
    category: { type: ObjectId, ref: 'categories', required: true},
    brands : { type: ObjectId, ref: 'brands', required: false},
    tags: [{ type: ObjectId, ref: 'tags', required: false }],
    discounts: [{ type: ObjectId, ref: 'discounts', required: false }],
    outstanding: [{type: String}],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
Products.index({ name: 'text', categories : 'text'});
module.exports = mongoose.model('products', Products);