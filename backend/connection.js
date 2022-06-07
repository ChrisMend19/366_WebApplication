const mysql = require('mysql');
  
const con = mysql.createConnection({
    host: "mysql.labthreesixfive.com",
    user: "group6a",
    password: "NR^DH\"e<CV8*j<@h",
    database: "group6a"
});
  
// Created the Connection
/*con.connect(function(err) {
   if (err) throw err;
     console.log("Connected!");
     });*/
//create connection and switch to group database
/*con.connect(function (err) {
   if (err) throw err;
   console.log("Connected!");

   var showTables = "show tables";
   con.query(showTables, function (err, result) {
       if (err) throw err;
       console.log(result);
   });
});*/
con.query(`select count(*) from Survey;`, (err, res) =>{
    if(err) throw err;
        console.log(res);
});
con.query(`select * from Survey;`, (err, res) =>{
    if(err) throw err;
        console.log(res);
});

async function getSurvey(){
    const survey = con.query(`select * from Survey;`);
    return survey;
}
async function getQuestions(surveyId){
    const questions = con.query(`select * from Questions where Survey = ${surveyId}`);
    return questions;
}
async function getPossibleAnswer(questionId, surveyId){
    const qtype = con.query(`select qtype from Questions where Survey = ${surveyId} 
        and QuestionId = ${questionId}`);
    if (qtype = 0){
        return con.query(`select * from Possibilities where qtype = 1 and QuestionNo = ${questionId}
        and survey = ${surveyId};`);}
    else {
        return con.query(`select * from Possiblities where qtype = 0;`);
    }
}
async function countResponses(surveyId){
    const counts = con.query(`select count(*) from SurveyResponse where SurveyId = ${surveyId};`);
}
//get all responses for a survey
async function getAllSurveyRes(SurveyId){
    const responses = con.query(`select * from SurveyResponse where SurveyId = ${SurveyId};`);
    return responses;
}
//get info for one survey response
async function getResponse(resId){
    const response = con.query(`select * from SurveyResponse where SurvResp = ${resId};`);
    return response;
}
//get responses to questions for one survey response
async function getIndividualRes(resId){
    const indResponse = con.query(`select * from Responses where SurvResp = ${resId};`);
    return indResponse
}

module.exports = {
    getSurvey,
    countResponses,
    getQuestions,
    getAllSurveyRes,
    getResponses,
    getIndividualRes
};
