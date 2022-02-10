const mysql = require("mysql");
const cors = require('cors');
const express = require("express");

const port = 3000;
app.use(cors());
const app = express();

// create connection

const db = mysql.createConnection({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected");
});

// Route get products
app.get("/", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

// Route get product by id
app.get("/product/:id", (req, res) => {
  let sql = `SELECT * FROM product WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

// filter by category

// query string search by category http://localhost:3000/products?category=1
app.get("/products", (req, res, next) => {
  const search = req.query;
  console.log("req.query " , search.category)
  let sql = "SELECT * FROM product WHERE category=" + JSON.parse(search.category);
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
 
});



app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

//  node app.js
