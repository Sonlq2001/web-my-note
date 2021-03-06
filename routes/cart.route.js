const express = require('express');
const router = express.Router();

const cartController = require('./../controllers/cart.controller');

router.get('/add/:id', cartController.addCart);

module.exports = router;