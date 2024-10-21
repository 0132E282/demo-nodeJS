const express = require('express');
const router = express.Router();
const path = require('path');
const categoryController = require(path.join(__dirname, '../app/controller/CategoryController'));
const storage = require(path.join(__dirname, '../config/storage'));
const {categoryValidateCreate, categoryValidateUpdate} = require(path.join(__dirname,'../app/middleware/validate/categoryValidate'));

router.get('/', categoryController.index)

router.get('/edit/:id', categoryController.showForm);
router.put('/edit/:id', storage.single('thumb'),categoryValidateCreate,  categoryController.edit);
router.get('/create', categoryController.showForm);
router.post('/create', storage.single('thumb'),categoryValidateUpdate, categoryController.create);
router.delete('/:id', categoryController.delete);
router.get('/alert/:status', categoryController.notification)
module.exports = router;