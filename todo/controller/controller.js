const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const moment = require('moment')
//const CognitoJwtVerifier = require("aws-jwt-verify").CognitoJwtVerifier;

exports.getAllTasks = async (req, res) => {
  // Verifier that expects valid access tokens:
  // const verifier = CognitoJwtVerifier.create({
  //   UserPoolId: "ap-south-1_FCM3q2v34", // Your user pool id here
  //   ClientId: "6k8it7fkegj23mu7bkshdm01fj", // Your client id here
  //   tokenUse: "access",
  // });

  try {
    // const payload = await verifier.verify(
    //   req.authorization
    // );
    // console.log("Token is valid. Payload:", payload);

    let data = await prisma.tasks.findMany({
      where:{
        userId:1
      },
    });
    return res.json(data);
  } catch {
    return res.status(400).send({mgs:'error'});
    //console.log("Token not valid!");
  }
};
exports.addTask = async (req, res) => {
  // Verifier that expects valid access tokens:
  // const verifier = CognitoJwtVerifier.create({
  //   UserPoolId: "ap-south-1_FCM3q2v34", // Your user pool id here
  //   ClientId: "6k8it7fkegj23mu7bkshdm01fj", // Your client id here
  //   tokenUse: "access",
  // });

  try {
    // const payload = await verifier.verify(
    //   req.authorization
    // );
    // console.log("Token is valid. Payload:", payload);

    let data = await prisma.tasks.create({
      data: {
        userId: 1,
        title: req.body.title,
        description: req.body.description,
        timestampCreated: moment().toISOString(),
        timestampUpdated: moment().toISOString(),
      },
    });
    return res.json(data);
  } catch {
    return res.status(400).send({mgs:'error'});
    //console.log("Token not valid!");
  }
  console.log(req);
};

exports.editTask = async (req, res) => {
  // Verifier that expects valid access tokens:
  // const verifier = CognitoJwtVerifier.create({
  //   UserPoolId: "ap-south-1_FCM3q2v34", // Your user pool id here
  //   ClientId: "6k8it7fkegj23mu7bkshdm01fj", // Your client id here
  //   tokenUse: "access",
  // });

  try {
    // const payload = await verifier.verify(
    //   req.authorization
    // );
    // console.log("Token is valid. Payload:", payload);

    let data = await prisma.tasks.update({
      where:{
        id:req.body.id
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        timestampUpdated: moment().toISOString(),
      },
    });
    return res.json(data);
  } catch {
    return res.status(400).send({mgs:'error'});
    //console.log("Token not valid!");
  }
};

exports.deleteTask = async (req, res) => {
  // Verifier that expects valid access tokens:
  // const verifier = CognitoJwtVerifier.create({
  //   UserPoolId: "ap-south-1_FCM3q2v34", // Your user pool id here
  //   ClientId: "6k8it7fkegj23mu7bkshdm01fj", // Your client id here
  //   tokenUse: "access",
  // });

  try {
    // const payload = await verifier.verify(
    //   req.authorization
    // );
    // console.log("Token is valid. Payload:", payload);

    let data = await prisma.tasks.delete({
      where:{
        id:req.body.id
      },
    });
    return res.json(data);
  } catch {
    return res.status(400).send({mgs:'error'});
    //console.log("Token not valid!");
  }
};
