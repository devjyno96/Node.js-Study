var http = require('http');
var fs = require('fs');
var url = require('url'); //(1)require == import
var app = http.createServer(function(request,response){
    var _url = request.url; //(2)
    console.log(_url)
    var queryData = url.parse(_url, true).query;// (3)
    var allData = url.parse(_url, true);// (3.1)
    console.log(allData);// (3.1)
    console.log(queryData.id); //(4)
    if(_url == '/'){ // (5)
      _url = '/index.html';
    }
    else{
        _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + _url)); //(6)
    // response.end(queryData.id);
 
});
app.listen(3000);