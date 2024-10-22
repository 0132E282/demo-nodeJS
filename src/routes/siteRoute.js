const express = require('express');
const router = express.Router();
const path = require('path');
const SiteController = require('../app/controller/SiteController');

router.get('/', SiteController.index)


module.exports = router;