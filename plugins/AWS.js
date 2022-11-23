"use strict";

const fp = require("fastify-plugin");

const AWS = require("aws-sdk");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
global.fetch = require("node-fetch");

var data = null

module.exports = fp(async function (fastify, opts) {
  const UserPoolId = process.env.AWS_COGNITO_USER_POOL_ID;
  const ClientId = process.env.AWS_COGNITO_CLIENT_ID;

  const poolData = {
    UserPoolId,
    ClientId,
  };

  AWS.config.update({
    region: process.env.AWS_COGNITO_REGION,
  });
  //
  const awsConfig = {
    signup: async (request) => {
      let attributeList = [];
      attributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: "email",
          Value: request.body.email,
        })
      );
      attributeList.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({
          Name: "name",
          Value: request.body.name,
        })
      );
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    await userPool.signUp(
        request.body.email,
        request.body.password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            console.log(err);
            data = err
          } else {
            data = result
          }
          //return data;
        }
      );
    },
  };
  fastify.decorate("awsConfig", awsConfig);
});
