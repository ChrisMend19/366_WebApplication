//main
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const{ json } = require("express");


app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {});

