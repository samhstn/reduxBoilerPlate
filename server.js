const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const port = 8000;

const server = new Hapi.Server();

server.connection({
  port: port
});

server.register(Inert, (err) => {
  if(err) throw err;
  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      const path = Path.join(__dirname, './production/index.html');
      reply.file(path);
    }
  },
  {
      method: 'GET',
      path: '/bundle.js',
      handler: (request, reply) => {
        const path = Path.join(__dirname, './production/bundle.js');
        reply.file(path);
      }
  }])
});

server.start(() => {
  console.log(`server running on port: ${server.info.uri}`);
})
