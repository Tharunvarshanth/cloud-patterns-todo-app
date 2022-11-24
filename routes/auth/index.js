"use strict";

 const login = async function (fastify, opts) {
  fastify.post(
    "/login",
    async (request, reply) => {
      return "login route";
    }
  );
};
module.exports = login
// const register = async function (fastify, opts) {
//   fastify.post(
//     "/register",
//     async (request, reply) => {
//       return "register route";
//     }
//   );
// };

// const confirmation = async function (fastify, opts) {
//   fastify.post(
//     "/confirmation",
//     async (request, reply) => {
//       return "confirmation route";
//     }
//   );
// };
