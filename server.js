const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());

// const con = mysql
//   .createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//   })
//   .promise();

const con = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

const sqlCreate = `create table if not exists usersData(
	id int primary key auto_increment,
	name varchar(255) not null,
	age int not null
  )`;

con.query(sqlCreate).then((err, results) => {
  console.log(results);
});

const user = ["Tom", 24];
const name = ["Tom"];
// const sqlInsert = `INSERT INTO usersData(name, age) VALUES(?, ?)`;

const sqlSelect = `SELECT * FROM usersData`;
// const sqlDelete = `DELETE FROM usersData where name=?`;

// con
//   .query(sqlSelect, name)
//   .then(([results, fileds]) => {
//     results.map((item) => console.log(item));
//   })
//   .catch((err) => {
//     console.log(err);
//   });

con
  .execute("UPDATE usersData SET age=age+1 WHERE name=?", ["Stan"])
  .then((result) => {
    console.log(result[0]);
    return pool.execute("SELECT * FROM usersData");
  })
  .then((result) => {
    console.log(result[0]);
    pool.end();
  })
  .then(() => {
    console.log("пул закрыт");
  })
  .catch(function (err) {
    console.log(err.message);
  });
//   con
//   .query(sqlCreate)
//   .then((err, result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// con
//   .query(sql)
//   .then(([results, fields]) => {
//     console.log(results);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
