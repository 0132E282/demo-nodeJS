const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const attributeSchema = new Schema({
    color: { type: String },
    size: { type: String },
    // Thêm các thuộc tính khác nếu cần
});

const options = new Schema({
    name: { type: String, required:true , index: true },
    slug: { type: String, min: 5, max: 40, required: true},
    price: { type: Number, required: true, index: true},
    price_reduced: { type: Number},
    attribute: attributeSchema,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('options', options);