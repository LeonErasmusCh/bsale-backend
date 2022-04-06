const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const res = require('express/lib/response');
const dotenv = require('dotenv');

// dotenv config
dotenv.config({ path: './.env' });

const app = express();

const port = process.env.PORT || 3000;
app.use(cors());

// create connection
console.log(process.env.DB_HOST);

const connection = mysql.createConnection({
  /*  host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DATABASE,  */
  host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  user: 'bsale_test',
  password: 'bsale_test',
  database: 'bsale_test',
});
//connection.connect();

connection.connect((err) => {
  if (err) {
    res.status(500).send('error');
  } else {
    console.log('Mysql connected');
  }
});

// Route get products
app.get('/', (req, res) => {
  let sql = 'SELECT * FROM product';
  let query = db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('error');
    }
    console.log(results);
    res.status(200).send(results);
  });
});

// Route get product by id
app.get('/product/:id', (req, res) => {
  let sql = `SELECT * FROM product WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('error');
    }
    console.log(results);
    res.status(200).send(results);
  });
});

// filter by category
// query string search by category http://localhost:3000/products?category=1
app.get('/products', (req, res, next) => {
  const search = req.query;
  console.log('req.query ', search.category);
  let sql =
    'SELECT * FROM product WHERE category=' + JSON.parse(search.category);
  let query = db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('error');
    }
    console.log(results);
    res.status(200).send(results);
  });
});

// search by name
// query string search by category http://localhost:3000/product?name=Mani+Sin+Sal
app.get('/product/', (req, res, next) => {
  const productName = req.query;
  console.log('req.query ', productName);
  let sql =
    'SELECT * FROM product WHERE name=' + JSON.stringify(productName.name);
  let query = db.query(sql, (err, results) => {
    console.log('results', results);
    if (err) {
      res.status(500).send('error');
    }
    console.log(results);
    res.status(200).send(results);
  });
});

connection.end();

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

// **** run local server (port:3000): node app.js ****

// local development server enpoint example
// http://localhost:3000/products?category=1

// **** deployed api endpoint examples ****

// get all products: https://leonbsaleapi.herokuapp.com/
// get products by category: https://leonbsaleapi.herokuapp.com/products?category=1
// get product by name: http://localhost:3000/product?name=Mani+Sin+Sal
// get product by id: https://leonbsaleapi.herokuapp.com/5
