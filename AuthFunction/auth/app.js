const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Client } = require("pg");
/*
const client = new Client({
  host: "todo-app-cloud.cdle6ghs5azs.ap-south-1.rds.amazonaws.com",
  port: 5432,
  user: "postgres",
  password: "todoappcloud",
  database: "todo",
});

client
  .connect()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("DB ERROR", err);
  });
*/
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const { signUp, login, confirmation } = require("./controller/controller");

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
router.post("/login", login);
router.post("/confirmation", confirmation);

router.get("/", function (req, res) {
  res.status(400).send("index");
});
router.get("/index", function (req, res) {
  res.send({});
});

app.use("/", router);
//const port = 3000;
//app.listen(port);
console.log("server started");
module.exports = app;

//delete node_modules/.cache, amazon-cognito-/android, amazon-cognito-/ios,

//https://github.com/prisma/prisma-examples
//npx prisma generate
//db-migrate up
//sam build
//sam deploy

//docker tag 0b1ba4e9141d 414608916390.dkr.ecr.ap-south-1.amazonaws.com/cloud-auth-api:0.0.2
//docker push 414608916390.dkr.ecr.ap-south-1.amazonaws.com/cloud-auth-api:0.0.2

//https://aws.amazon.com/blogs/compute/using-container-image-support-for-aws-lambda-with-aws-sam/
