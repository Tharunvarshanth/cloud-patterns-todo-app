'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/',	{
    schema:{
      tags:['Log'],
      params: {
        type: 'object',
        properties: {
          lang: {
            type: 'string',
            default:'zh',
          },
          participantId: {
            type: 'number',
            default:1,
          }
        },
      },
    },
  }, async function (request, reply) {
    return 'this is an example'
  })
}
