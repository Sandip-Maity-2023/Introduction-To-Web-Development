// server.js
const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.end("Server is running!");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
