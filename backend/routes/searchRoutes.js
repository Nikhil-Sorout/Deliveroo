const express = require('express');
const search = require('../controllers/searchController');


const router = express.Router();


router.route('/restaurants').get(search);


module.exports = router;