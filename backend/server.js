const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id", connection.threadId);
});
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server...." });
    return res.json(result);
  });
});

app.post("/student", (req, res) => {
  const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
  const values = [req.body.name, req.body.email];
  connection.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE ID =?";
  const id=req.params.id;
  connection.query(sql,[id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server...." });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listing");
});
