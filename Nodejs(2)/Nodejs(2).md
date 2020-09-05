# Node.js (2) URL 쿼리 스트링 해석

https://opentutorials.org/module/3549/21046



## 1. URL이란? 

* 위키백과 
  * 네트워크 상에서 자원이 어디 있는지를 알려주기 위한 규약이다. 즉, [컴퓨터 네트워크](https://ko.wikipedia.org/wiki/컴퓨터_네트워크)와 검색 [메커니즘](https://ko.wikipedia.org/wiki/메커니즘)에서의 위치를 지정하는, [웹 리소스](https://ko.wikipedia.org/w/index.php?title=리소스_(웹)&action=edit&redlink=1)에 대한 참조이다. 쉽게 말해서, **웹 페이지를 찾기위한 주소를 말한다.**

* 구조 - https://developer.mozilla.org/ko/docs/Learn/Common_questions/What_is_a_URL
  * ![01](D:\Node.js Study\Nodejs(2)\img\01.PNG)
  * **protocal** : 자원에 접근할 방법을 정의해둔 프로토콜 이름을 적습니다. 스터디 중엔 **http**를 사용합니다
  * **host(momain)** : 자원이 위치한 **Domain 주소**를 적습니다
  * **port** : 자원 내 **프로세서 구분**을 위한 번호입니다
  * **path** : 웹서버 내에서 **자원 경로를 구분**하기 위해 사용합니다
  * **query string** : **웹서버에 제공하는 추가 파라미터**입니다. 이 파라미터들은 `&` 기호로 구분된 키/값으로 짝을 이룬 리스트입니다.



이번시간에는 **query string**을 통해 **브라우저에서 서버로 데이터를 전송**하는 방법을 연습해 보겠습니다.



## 2. 실습

* index.html

  * ```html
    <h1>hello Node.js!</h1>
    ```

* main.js
  * ```javascript
    var http = require('http');
    var fs = require('fs');
    var url = require('url'); //(1)require == import
    var app = http.createServer(function(request,response){
        var _url = request.url; //(2)
        console.log(_url) //(2.1)
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
    ```

  * **요청 URL : http://localhost:3000/?id=10**

  * Node.js에서 **패키지는 require(package)로 모듈을 로딩**합니다 - [참고자료1](https://jongmin92.github.io/2017/07/13/Node/require/)  [참고자료2](https://m.blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=221022257248&proxyReferer=https:%2F%2Fwww.google.com%2F)

  * **(1)** url 정보를 분석하거나 문자열로 변환하기 위해 'url' 모듈을 로딩했습니다

  * (2) request 객체에 담긴 url 값을 _url 변수에 저장합니다

    * 기존에 로딩한 모듈인 **url과 혼동을 피하기 위해 변수 이름을 _url로 저장**합니다
    * **(2.1)** _url엔 **URL 전체 경로가 저장되는 것이 아닌 host:port 뒤의 내용이 저장**됩니다

  * **(3)** url 모듈의 **parse함수를 사용해 url을 분석**하고 .query 부분만 따로 저장합니다.

    * **(3.1)** 만약 따로 뽑아 내지 않는다면 **url.parse의 결과**는 어떻게 나올까?

      * URL을 요청했을때의 결과는? - 아래 **object** 가 반환됩니다

    * ```
      Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?id=10',
        query: [Object: null prototype] { id: '10' },
        pathname: '/',
        path: '/?id=10',
        href: '/?id=10' }
      ```

  * **(4)** log에 query 중 id의 값인 10이 찍히게 됩니다
  * **(5)** _url의 값에 따라 다른 결과를 전송하기 위해 분기점을 지정합니다
    * 이번 시간에는 따로 지정할 필요가 없습니다
  * **(6)** 서버의 index.html을 전송해 주기 위해 파일을 읽어 들인 후 response에 저장합니다



## 3. 마치며

실제 REST API 환경에서 위의 방식으로 url의 값을 비교해서 사용하지는 않습니다.

그러나 이번에 해본것은 위의 방식을 통해 **URL을 통해 입력된 값을 서버에서 사용**할 수 있게 됩니다. 

서버에서 브라우저로 데이터를 전송하기만 하는 일방통행 서비스를 만드는것이 아닌 브라우저와 서버 사이의 통신을 통해 **동적 페이지를 작성**할 수 있게 됬습니다.



다음엔 **동적 페이지를 작성하는 방법**에 대해 알아보겠습니다.