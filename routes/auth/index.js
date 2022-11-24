"use strict";

module.exports = async function (fastify, opts) {
  fastify.post(
    "/register",
    {
      schema: {
        tags: ["ToDo"],
        body: {
          type: "object",
          properties: {
            email: {
              type: "string",
              default: "nnirosh447@gmail.com",
            },
            name: {
              type: "string",
              default: "name",
            },
            password: {
              type: "string",
              default: "todo@12345",
            },
          },
        },
      },
    },
    async function (request, reply) {
      var data = await fastify.awsConfig.signup(request);
      console.log(data);
      return data;
    }
  );

  fastify.get(
    "/login",
    {
      schema: {
        tags: ["ToDo"],
      },
    },
    async function (request, reply) {
      return "Login Route";
    }
  );

  fastify.get(
    "/confirmation",
    {
      schema: {
        tags: ["ToDo"],
      },
    },
    async function (request, reply) {
      return "Confirmation Route";
    }
  );
};
