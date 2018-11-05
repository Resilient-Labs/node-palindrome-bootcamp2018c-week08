const http = require('http');
const fs = require('fs')
const url = require('url');
var querystring = require('querystring');
const figlet = require('figlet')


const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  function checkPalindrom(str) {
    return str == str.split('').reverse().join('');
  }

  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('text' in params){

      if(checkPalindrom(params['text'])==true){
        res.writeHead(200, {'Content-Type': 'application/json'});
        var objToJson = {
          result: "TRUE"
        }
        res.end(JSON.stringify(objToJson));
      }
      else if(checkPalindrom(params['text']) != true){
        res.writeHead(200, {'Content-Type': 'application/json'});
        var objToJson = {
          result: "FALSE"
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == 'js/script.js'){
    fs.readFile('/js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
