const http = require('http');
const fs = require('fs');

let assignHeader = function(fileName) {
  let index = fileName.lastIndexOf('.');
  let fileType = fileName.slice(index+1);
  let headers = {
    'js' : 'text/javascript',
    'css' : 'text/css',
    'html' : 'text/html',
    'gif' : 'img/gif',
    'jpeg' : 'img/jpeg'
  }
  return headers[fileType];
}

const responceToFileFound = function(res,fileName) {
  res.setHeader('Content-Type', assignHeader(fileName));
  res.write(fs.readFileSync(fileName));
  res.statusCode = 200;
}

const responceToFileNotFound = function(res) {
  res.statusCode = 404;
  res.write('file not found');
}

const fileServer = function(res,fileName) {
  if (!fs.existsSync(fileName) || fileName=='server.js') {
    responceToFileNotFound(res);
  }
  else {
    responceToFileFound(res,fileName);
  }
}

const requestHandler = function(req, res) {
  console.log(req.url);
  let fileName = req.url.replace('/', '');
  if(fileName=='') res.writeHead(302,{'location':'index.html'})
  fileServer(res,fileName);
  res.end();
};

const server = http.createServer(requestHandler);
const PORT = 9999;
server.listen(PORT);
console.log(`listening to ${PORT}`);
