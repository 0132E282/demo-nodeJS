const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require(path.join(__dirname,'../app/controller/UserController.js'));
const {userValidateCreate, userValidateUpdate} = require(path.join(__dirname,'../app/middleware/validate/userValidate'));
// hiển thị table người dùng
router.get('/',usersController.index)

// hiện thi thông tin người dùng
router.get('/create',usersController.showForm)
// tạo người dùng 
router.post('/create', userValidateCreate ,usersController.create)

// hiện thị form nhập người dùng cập nhập
router.get('/:id',usersController.showForm)

//  thực hiện cập nhập người dùng 
router.put('/:id', userValidateUpdate, usersController.edit)
//  xóa môt người dùng
router.delete('/:id', usersController.remove)

//  thông báo người dùng đã cập nhập hoạt tạo
router.get('/alert/:status', usersController.notification)

module.exports = router;
