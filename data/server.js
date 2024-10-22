const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('almacen.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors());  // Habilitar CORS
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
