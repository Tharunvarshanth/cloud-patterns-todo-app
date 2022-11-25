const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const PrismaClient =  require('@prisma/client').PrismaClient;
const prisma = new PrismaClient()
var poolData = {
  UserPoolId: "ap-south-1_FCM3q2v34", // Your user pool id here
  ClientId: "6k8it7fkegj23mu7bkshdm01fj", // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.signUp = (req, res) => {
  console.log(req.body)
  var dataEmail = {
    Name: "email",
    Value: req.body.email,
  };

  var dataName = {
    Name: "name",
    Value: req.body.name,
  };
  var attributeList = [];
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
  attributeList.push(attributeEmail);
  attributeList.push(attributeName);

  userPool.signUp(req.body.email, req.body.password, attributeList, null, async function (err, result) {
    if (err) {
      console.log(err.message || JSON.stringify(err));
      res.status(400).send({ err: err });
      return;
    }
    console.log(result)
    var cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
    console.log("user name is " + result.userSub);
    var data = await prisma.users.create({
      data:{
        key:result.userSub,
        name:cognitoUser.getUsername()
      }
    })
    console.log(data)
   // res.json({ res: result });
  });
  res.send({ res: "no-response" });
  return;
};
