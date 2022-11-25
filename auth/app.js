const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Client } = require("pg");

const client = new Client({
  host: "todo-app-cloud.cdle6ghs5azs.ap-south-1.rds.amazonaws.com",
  port: 5432,
  user: "postgres",
  password: "rootroot",
  database: "todo",
  timeout: 60000,
});

client
  .connect()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
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

router.get("/index", function (req, res) {
  res.send({});
});

app.use("/", router);

module.exports = app;
