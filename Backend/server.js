// server.js
//const http = require('http');
import http from 'http';
const PORT = 3001;

const server = http.createServer((req, res) => {

    if(req.url==='/'){

          res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>Complete web development</title></head>');
  res.write('<body><h1>subscribe</h1>');
  res.write('<form>');
  res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
  res.write('<label for="male">Male</label>')
  res.write('<input type="radio" id="male" name="gender" value="male"/>')
  res.write('<label for="female">Female</label>')
  res.write('<input type="radio" id="female" name="gender" value="female"/>')
  res.write('</form>');
  res.write('</body>');

  res.write('</html>');
  return res.end();

    }else if(req.url==='/pro'){


          res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>okay</h1></body>');
  res.write('</html>');
  return res.end();

    }
  //res.end("Server is running!");
  res.setHeader('content-Type','text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>reality</h1></body>');
  res.write('</html>');
  return res.end();
  //process.exit();
    

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
