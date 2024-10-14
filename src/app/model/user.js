const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// định nghĩ user
const Users = new Schema({
    name: { type: String, required:true , index: true },
    password: { type: String, min: 5, max: 40, required: true},
    email: { type: String, required: true, index: true},
    photo_url: { type: String},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
// cho phép tìm kiếm trên 2 trường name, và email
Users.index({ name: 'text', email: 'text' });
module.exports = mongoose.model('users', Users);
