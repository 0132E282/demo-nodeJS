const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require(path.join(__dirname,'../app/controller/UserController.js'));
const {userValidateCreate, userValidateUpdate} = require(path.join(__dirname,'../app/middleware/validate/userValidate'));
router.get('/',usersController.index)
router.get('/create',usersController.showForm)
router.post('/create', userValidateCreate ,usersController.create)

router.get('/:id',usersController.showForm)
router.put('/:id', userValidateUpdate, usersController.edit)
router.delete('/:id', usersController.remove)

router.get('/alert/:status', usersController.notification)

module.exports = router;