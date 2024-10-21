const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Categories = new Schema({
    name: { type: String, required:true , index: true }, 
    slug: { type: String, min: 5, max: 60, required: true},
    parent: { type: ObjectId,  ref: 'category', required: false},
    thumbnail: { type: String},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
Categories.methods.children = async function () {
    const childrenList = await this.model('categories').find({ parent: this._id });
    return {
        ...this._doc,
        children: await Promise.all(childrenList.map(children => children.children())),
    }
};
Categories.index({ name: 'text'});
module.exports = mongoose.model('categories', Categories);