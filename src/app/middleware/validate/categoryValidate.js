const { body, validationResult } = require('express-validator');
module.exports = {
   categoryValidateCreate: [
        body('name').not().isEmpty().withMessage('Name is required'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ],
   categoryValidateUpdate: [
        body('name').not().isEmpty().withMessage('Name is required'),
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