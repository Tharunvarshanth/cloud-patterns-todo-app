'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/register',	{
    schema:{
      tags:['ToDo'],
      body: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            default:'nnirosh447@gmail.com',
          },
          name: {
            type: 'string',
            default:'name',
          },
          password: {
            type: 'string',
            default:'todo@12345',
          }
        },
      },
    },
  }, async function (request, reply) {

    var data = await fastify.awsConfig.signup(request)
 console.log(data)
 return data
    })
}
