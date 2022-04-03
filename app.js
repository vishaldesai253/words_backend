var express = require("express");
var cors = require("cors");
const { mySqlApi } = require("./mySqlApi");
const bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/getwords", (req, res) => {
  console.log(req.body);
  mySqlApi
    .executeQuery("select * from words")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(200).send("somthing went wrong");
    });
});
app.post("/addword", (req, res) => {
  console.log(req.body);
  word = req.body.word;
  query = "insert into words(word) values('?1')";
  query = query.replace("?1", word);
  console.log("word", query);
  mySqlApi
    .executeQuery(query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send("somthing went wrong");
      console.log(err);
    });
});

app.post("/deleteword", (req, res) => {
  console.log(req.body);
  id = req.body.id;
  query = "delete from words where id=?1";
  query = query.replace("?1", id);
  console.log("word", query);
  mySqlApi
    .executeQuery(query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send("somthing went wrong");
      console.log(err);
    });
});

app.post("/updateword", (req, res) => {
  console.log(req.body);
  id = req.body.id;
  word = req.body.word;
  query = "update words set word='?1' where id=?2";
  query = query.replace("?1", word);
  query = query.replace("?2", id);
  console.log("word", query);
  mySqlApi
    .executeQuery(query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send("somthing went wrong");
      console.log(err);
    });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
