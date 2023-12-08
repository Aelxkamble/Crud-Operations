


const mysql= require('mysql2');
const express = require('express');
const cors =require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'crud'
})
connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err.stack);
      return;
    }
    console.log("Connected to MySQL as id", connection.threadId);
  });
app.get('/',(req,res)=>{
    const sql = "SELECT * FROM student";
    connection.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Error inside server...."});
        return res.json(result);
    })
})

app.listen(8081,()=>{
    console.log("Listing")
})