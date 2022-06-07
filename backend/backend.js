//main
const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const{ json } = require("express");
const mysql = require('mysql');
  
const con = mysql.createConnection({
    host: "mysql.labthreesixfive.com",
    user: "group6a",
    password: "NR^DH\"e<CV8*j<@h",
    database: "group6a"
});

app.use(cors());
app.use(express.json());


app.get("/Dashboard", async (req, res) => {
    con.query(`select * from Survey;`, (err, ret) =>{
        if(err) throw err;
          res.send(ret);
          //console.log(ret);
    });
});
app.post("/Dashboard", async (req, res) => {
    const id = req.params["surveyId"];
    const status = req.params["status"];
    if (status == 1){
        con.query(`update table Survey set Status = false where SurveyId = ${id};`, (err, ret) =>{
            if(err) throw err;
              res.status(201).end();
        });
    }
    else{
        con.query(`update table Survey set Status = false where SurveyId = ${id};`, (err, ret) =>{
            if(err) throw err;
              res.status(201).end();
        });
    }
});
//get all questions in a survey
app.get("/ShowSurveys/:survey", async (req, res) => {
    const id = req.params["survey"];
    con.query(`select * from Questions where Survey = ${id};`, (err, result)=>{
        if(err) throw err
        res.status(201).send(result);
    })
});
//get survey responses on responses page
app.get("/SurveyResponses/:survey", async (req, res) => {
    const SurveyId = req.params["survey"];
    con.query(`select * from SurveyResponse where SurveyId = ${SurveyId};`, (err, result) =>{
        if(err) throw err;
          res.status(201).send(result);
    })
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});