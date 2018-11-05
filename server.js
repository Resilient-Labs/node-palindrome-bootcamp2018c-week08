const http = require('http');
const fs = require('fs')
const url = require('url');
let querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  let params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {

    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      console.log(data)
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    const pal = str => 
      str.toLowerCase().split('').reverse().join('') === str
    if('student' in params){
      if(pal(params['student'])){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let objToJson = {
          val: "true"
        }
        res.end(JSON.stringify(objToJson));
      }// palindrom === input
      else if(pal(params['student']) != params['student']){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let objToJson = {
          val: "false"
        }
        res.end(JSON.stringify(objToJson));
      }//palindrome != input
    }// 
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
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
