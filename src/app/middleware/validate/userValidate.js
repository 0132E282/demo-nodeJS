const { body, validationResult } = require('express-validator');
module.exports = {
    userValidateCreate: [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ],
    userValidateUpdate: [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ]
}