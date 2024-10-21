const { body, validationResult } = require('express-validator');
module.exports = {
    // validate form when user create
    userValidateCreate: [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // gữi thông báo lỗi được lưu trữ trên ss khi  gữi req không đúng yêu cầu và quay lại trang form
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ],
    // validate form when user update
    userValidateUpdate: [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // gữi thông báo lỗi được lưu trữ trên ss khi  gữi req không đúng yêu cầu và quay lại trang form
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ]
}
