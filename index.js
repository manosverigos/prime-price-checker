let scrape_functions = require('./scrape_function.js');
const env = require('dot-env');
const express = require('express');
const {
  response
} = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at ${port}`));
app.use(express.static('./public'));
app.use(express.json());

app.post('/search', async (req, res) => {
  let prices = await scrape_functions.forLoop(req.body.barcode);
  console.log(prices)
  res.json({
    prices: prices
  })
})