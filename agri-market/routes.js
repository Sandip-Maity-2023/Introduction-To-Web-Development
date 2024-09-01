const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Apples', price: 2.5 },
  { id: 2, name: 'Tomatoes', price: 1.5 },
];

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;
