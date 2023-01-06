//Data
const { users } = require('../data');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    const { size } = req.query;
    
    const limit = size || 10;
    const products = [];

    for(let i = 0; i < limit; i++) {
        products.push(users[i]);
    }
    
    res.json(products);
});


router.get('/:id', (req, res) => {

    const { id } = req.params;
    res.json(users.find(product => product.id.toString() === id));
});

module.exports = router;