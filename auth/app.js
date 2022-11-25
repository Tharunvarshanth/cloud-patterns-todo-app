const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rootroot",
  database: "todo",
});

client.connect();
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const { signUp } = require("./controller/controller");

var poolData = {
  UserPoolId: "ap-south-1_FCM3q2v34", // Your user pool id here
  ClientId: "6k8it7fkegj23mu7bkshdm01fj", // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//Static content ie images
app.use("/static", express.static("static"));

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

router.post("/sign-up", signUp);

/*var dataEmail = {
    Name: "email",
    Value: "nnirosh447@gmail.com",
  };

  var dataName = {
    Name: "name",
    Value: "Niroshan",
  };
  var attributeList = [];
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
  attributeList.push(attributeEmail);
  attributeList.push(attributeName);

  userPool.signUp("nnirosh447@gmail.com", "todo@12345", attributeList, null, async function (err, result) {
    if (err) {
      console.log(err.message || JSON.stringify(err));
      res.status(400).send({ err: err });
      return;
    }
    var cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
    res.json({ res: result });
  });
  res.send({ res: "no-response" });*/

router.get("/index", function (req, res) {
  res.send({});
});

app.use("/", router);

module.exports = app;
