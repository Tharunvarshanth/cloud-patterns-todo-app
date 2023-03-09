const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const client = new Client({
  host: "todo-app-cloud-new.cimpsfx1hrlb.ap-south-1.rds.amazonaws.com",
  port: 5432,
  user: "postgres",
  password: "adminadmin",
  database: "todo_app",
});

client
  .connect()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("DB ERROR", err);
  });

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const { addTask, deleteTask, editTask, getAllTasks } = require("./controller/controller");

var poolData = {
  UserPoolId: "ap-south-1_9cDZ9Qhek", // Your user pool id here
  ClientId: "7t3mhpalqehch1jklujlga9cip", // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//Static content ie images
app.use("/static", express.static("static"));

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

router.get("/", getAllTasks);
router.post("/add", addTask);
router.post("/edit", editTask);
router.post("/delete", deleteTask);

router.get("/index", function (req, res) {
  res.send({});
});

app.use("/todo", router);

module.exports = app;
