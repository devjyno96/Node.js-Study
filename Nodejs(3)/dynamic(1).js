var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    if(_url == '/'){
      title = 'Welcome';
    }
    else{
      title = queryData.id
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>Dynamic(1) - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
    <p>queryString id = 의 결과는
      <h2>${title}</h2>
    </body>
    </html>
    `;
    response.end(template);
 
});
app.listen(3000);