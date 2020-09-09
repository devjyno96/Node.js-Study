var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = url.parse(request.url, true).pathname;
    var queryData = url.parse(request.url, true).query;
    if(_url == '/'){
      _url = '/AjaxHtml.html';
      response.writeHead(200);
      response.end(fs.readFileSync(__dirname + _url));
    }
    if(_url == '/ajaxFunc'){
      _url = '/ajaxFunc.js';
      response.writeHead(200);
      response.end(fs.readFileSync(__dirname + _url));
    }
    if(_url == '/rest'){
      var data = queryData.id;
      data += "rest";

      var response_json = JSON.stringify({'data' : data});
      _url = '/ajaxFunc.js';
      response.writeHead(200);
      response.end(response_json);
    }
 });
app.listen(3000);