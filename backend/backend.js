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

// Surveys

// get all surveys
app.get("/Dashboard", async (req, res) => {
    con.query(`select * from Survey;`, (err, ret) =>{
        if(err) throw err;
          res.send(ret);
          //console.log(ret);
    });
});

app.post("/Dashboard", async (req, res) => {
    const id = req.body["surveyId"];
    const status = req.body["status"];
    if (status == 1){
        con.query(`update Survey set Status = false where SurveyId = ${id};`, (err, ret) =>{
            if(err) throw err;
              res.status(201).end();
        });
    }
    else{
        con.query(`update Survey set Status = true where SurveyId = ${id};`, (err, ret) =>{
            if(err) throw err;
            con.query(`select * from Survey;`, (err, ret) =>{
                if(err) throw err;
                  res.send(ret);
                  //console.log(ret);
            });
        });
    }
});

//get all questions in a survey
app.get("/ShowSurveys/:survey", async (req, res) => {
    const id = req.params["survey"];
    console.log(id);
    con.query(`select * from SurveyResponse where SurveyId = ${id};`, (err, result)=>{
        if(err) throw err
        res.status(201).send(result);
    })
        
});

//get all questions for a survey
app.get("/CurrentSurvey/:survey", async (req, res) => {
    const survey = req.params["survey"];
    con.query(`select * from Questions where Survey = ${survey};`, (err, result)=>{
        if(err) throw err
        res.status(201).send(result);
    })

})
//get possible responses for a question
app.get("/EditCurrentSurvey/:survey", async (req, res) => {
    const qId = req.body["questionId"];
    const qtype = req.body["qtype"];
    const survey = req.params["survey"];
    if(qtype == 1){
        con.query(`select * from Possibilities where qtpye = ${qtype} and survey = ${survey};`,
         (err, result)=>{
            if(err) throw err
            res.status(201).send(result);
        })
    }
    else{
        con.query(`select * from Possibilities where qtpye = ${qtype} and survey = ${survey} 
            and QuestionNo = ${qId};`,  (err, result)=>{
            if(err) throw err
            res.status(201).send(result);
        })
    }
})
app.delete("/EditCurrentSurvey/:survey", async (req, res)=>{
    
})
//get survey responses on responses page
app.get("/SurveyResponses/:survey", async (req, res) => {
    const SurveyId = req.params["survey"];
    con.query(`select * from SurveyResponse where SurveyId = ${SurveyId};`, (err, result) =>{
        if(err) throw err;
          res.status(201).send(result);
    })
});

// ONET JOBS
// get all Onet Jobs
app.get("/OnetJobs", async (req, res) => {
    con.query(`select * from ONetJobs;`, (err, ret) =>{
        if(err) throw err;
          res.send(ret);
    });
});
app.get("/Job",  async (req, res) => {
    const title = req.body["title"];
    con.query(`select * from OnetData where Title = ${title};`, (err, ret) =>{
        if(err) throw err;
          res.send(ret);
    });
});
app.get("/:survey/Recommendation/:response", async (req, res)=>{
    const survey = req.params["survey"];
    const response = req.params["response"];
    if(survey == 1){
        con.query(`select * from UREProfilesMatch where profileId = ${response};`, (err, result)=>{
            if(err) throw err
            res.send(result);
        })
    } else {
        console.log("Wrong Survey Type");
    }
});
app.get("/:survey/SurveyResponses/:response", async (req, res)=>{
    const survey = req.params["survey"];
    const response = req.params["response"];
    con.query(`
        (select r.QuestionNo as QuestionNo, r.QValue as QValue, p.TextPrompt as TextPrompt
        from Responses r, Possibilities p, Questions q
        where r.SurvResp = ${response} and p.survey = ${survey}
        and r.QuestionNo = q.QuestionId and q.qtype = p.qtype
        and q.Survey = p.survey
        and p.qtype = 0 and r.QValue = p.ResponseID)
        UNION
        (select r.QuestionNo as QuestionNo, r.QValue as QValue, p.TextPrompt as TextPrompt
        from Responses r, Possibilities p
        where r.SurvResp = ${response} and p.survey = ${survey}
        and p.qtype = 1 and r.QValue = p.ResponseID);`, (err, result)=>{
            if(err) throw err
            res.send(result);
        })
});

//create profile chars
app.get("/CreateProfileChar", (req, res)=>{
    con.query(`select count(*) as cnt from profileChars`, (err, result)=>{
        if(err) throw err
        res.send(result);
    })
});

app.post("/CreateProfileChar", (req, res)=>{
    const id = req.body["Id"];
    const dimension = req.body["dimension"];
    const charName = req.body["char"];
    const description = req.body["description"];
    con.query(`insert into profileChars (Id, dimension, characteristics, descrp) 
    values(${id}, "${dimension}", "${charName}"," ${description}")`, (err, ret)=>{
        if(err) throw err
        res.status(200).end();
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});