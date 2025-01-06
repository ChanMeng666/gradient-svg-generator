const http = require('http');
const url = require('url');
const app = require('./src/index');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  app(
    { query: queryObject },
    {
      setHeader: (name, value) => res.setHeader(name, value),
      send: (body) => res.end(body)
    }
  );
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});