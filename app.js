const mysql = require("mysql");
const cors = require('cors');
const env = require('dotenv').config()
const express = require("express");
const res = require("express/lib/response");
const port = process.env.PORT || 3000 

const app = express();
app.use(cors());

// create connection

const db = mysql.createConnection({
 host: process.env.HOST,
 user: process.env.USER,
 password: process.env.PASSWORD,
 database: process.env.DATABASE,
});

console.log("APP", db)

db.connect((err) => {
  if (err) {
    res.status(500).send("error")
  }
  console.log("Mysql connected");
});

// Route get products
app.get("/", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = db.query(sql, (err, results) => {
    if (err){
      res.status(500).send("error")
    };
    console.log(results);
    res.status(200).send(results);
  });
});

// Route get product by id
app.get("/product/:id", (req, res) => {
  let sql = `SELECT * FROM product WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err){
      res.status(500).send("error")
    };
    console.log(results);
    res.status(200).send(results);
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
    res.status(200).send(results);
  });
 
});



app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

//  node app.js
// https://leonbsaleapi.herokuapp.com/ | https://git.heroku.com/leonbsaleapi.git
