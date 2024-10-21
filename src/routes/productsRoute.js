const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require(path.join(__dirname, '../app/controller/productsController'));
const storage = require(path.join(__dirname, '../config/storage'));
const {productsValidateCreate, productsValidateUpdate} = require(path.join(__dirname,'../app/middleware/validate/productsValidate'));

const uploadFile = storage.fields([
    { name: 'thumbnail', maxCount: 1 },   // Một file cho trường 'photo_url'
    { name: 'images', maxCount: 10 }      // Nhiều file cho trường 'images', tối đa là 10 file
]);

router.get('/', productsController.index)
router.post('/create', uploadFile, productsValidateCreate ,productsController.create);
router.get('/create', productsController.showForm);
router.get('/edit/:id', productsController.showForm);
router.put('/edit/:id', uploadFile, productsValidateCreate ,productsController.edit);
router.delete('/:id', productsController.delete);

module.exports = router;