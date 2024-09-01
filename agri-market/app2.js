const express = require('express');
const bodyParser = require('body-parser');
const farmersRoutes = require('./routes/farmers');
const productsRoutes = require('./routes/products');

const app = express();
app.use(bodyParser.json());

app.use('/api/farmers', farmersRoutes);
app.use('/api/products', productsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
