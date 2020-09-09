# Node.js (3) 동적 페이지 생성

https://opentutorials.org/course/3332/21047

이전까지 작성한 Node.js와 HTML은 **정적 페이지(Static Web Page)**라고 합니다. 

하나의 요청에 하나의 페이지만 보여주기때문에 다른 데이터를 보여주려면 **서버에 저장된 웹 페이지를 수정**해야 합니다.

이런 방식으로 개발한다면 유저 하나마다 다른 페이지를 생성해 줘야 할텐데 이는 말도 안되는 방법입니다.

그래서 개발자들은 **동적 페이지** 라는 방법을 사용하기 시작합니다

## 1. 정적, 동적 페이지

![1](D:\Node.js Study\Nodejs(3)\img\1.PNG)



* 정적 페이지
  * 요청한 URL에 해당하는 고정된 HTML을 전송해 줍니다
* 동적페이지
  * 요청한 URL와 Request에 담긴 데이터를 서버에서 처리해 HTML을 작성한 후 브라우저에 전송합니다.

## 2. 실습

URL의 쿼리에 따라 다른 값이 나오는 웹페이지를 만들어 보겠습니다

----

* dynamic(1).js

  * ```javascript
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
    ```

* 결과

  ![6](D:\Node.js Study\Nodejs(3)\img\6.PNG)

  * URL에서 /?id={String} 쿼리의 값이 서버로 전달되고 그 값을 [템플릿 리터럴](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)을 통해 HTML ${title} 부분에 삽입합니다.
  * 그 결과를 브라우저에 전달해 URL 쿼리에 따라 다른 HTML이 나타나게 됩니다.



## 3. 더 좋은 방법은?

확실히 이전에 사용한 정적 페이지 보단 좋은 방법으로 보입니다. 

유저마다 다른 페이지를 만들어 줄 필요 없이 다른 결과(또는 다른 페이지)를 보여줄 수 있으니깐요.

**하지만 이 방법도 서버, 브라우저 양쪽에 좋은 방법은 아닙니다.**

![2](D:\Node.js Study\Nodejs(3)\img\2.PNG)

* **서버** 입장
  * **실제 변경되는 데이터는 전체 중 일부**
    * 하지만 그 일부만 바꾸기는 불가능 - **전체 HTML을 작성**
    * 작성된 **전체 HTML을 전송**
    * 바꾸는 데이터에 비해 **많은 연산과 대역폭**이 발생
* **브라우저** 입장
  * **실제 변경되는 데이터는 전체 중 일부**
    * 서버에서 일부 데이터만 주는 것이 아닌 **HTML 전체를 전송**
    * 브라우저는 받은 HTML을 토대로 **전체 화면을 다시 작성**
    * 데이터 일부를 수정하기 위해 **항상 화면 전체를 다시 작성**
    * 매 접속마다 바뀌는 데이터에 비해 **많은 연산과 대역폭**이 발생

서버와 브라우저의 공통적인 문제는 바뀌는 데이터에 비해 너무 많은 데이터를 처리한다는 점 입니다.

이 문제를 해결하기 위해서 어떤 방법이 필요할까요?

서바와 브라우저 사이에서는 **데이터만** 주고 받으면 되지 않을까요?

이 생각을 구현하기 위한 기법이 **REST와 Ajax** 입니다.

## 4. REST

위키백과 [참고자료1](https://meetup.toast.com/posts/92) [참고자료2](https://spoqa.github.io/2012/02/27/rest-introduction.html) [참고자료3](https://medium.com/@hckcksrl/rest%EB%9E%80-c602c3324196)

* [**REST**(Representational State Transfer)](https://ko.wikipedia.org/wiki/REST)는 [월드 와이드 웹](https://ko.wikipedia.org/wiki/월드_와이드_웹)과 같은 분산 [하이퍼미디어](https://ko.wikipedia.org/wiki/하이퍼미디어) 시스템을 위한 **[소프트웨어 아키텍처](https://ko.wikipedia.org/wiki/소프트웨어_아키텍처)**의 한 형식이다. 이 용어는 로이 필딩(Roy Fielding)의 2000년 박사학위 논문에서 소개되었다. 필딩은 [HTTP](https://ko.wikipedia.org/wiki/HTTP)의 주요 저자 중 한 사람이다. 이 개념은 네트워킹 문화에 널리 퍼졌다.

REST 구성

* **자원(Resource)** - URL 사용

  * 자원을 구분하는 고유한 URL

* **행위(Verb)** - HTTP METHOD 사용(POST, GET, DELETE, PUT)

  * 어떤 행동을 할것인지 서버에 알려주는 역활

* **표현(Representation)** - 서버의 응답

  * 서버에서 응답 상태와 데이터를 받아오는 역활

* 예시

  * ```http
    GET /uesr/1
    ```

    user 자원 내의 1 값을 가진 자원 **조회**

  * ```HTTP
    POST /user
    ```

    form 데이터를 user 자원에 **저장**

  * ```HTTP
    DELETE /user/1
    ```

    user의 1값을 가진 자원 **삭제**

  * ```http
    PUT /user/1
    ```

    user의 1 값을 가진 자원 수정

위의 예시와 같이 자원은 URL로 고유하게 구분되고 행동은 HTTP Method로 구분한다.

## 5. Ajax

위키백과

* [Ajax(**A**synchronous **J**avascript **a**nd **X**ml)](https://ko.wikipedia.org/wiki/Ajax)는 비동기적인 웹 애플리케이션의 제작을 위해 아래와 같은 조합을 이용하는 웹 개발 기법입니다.
  * 표현 정보를 위한 [HTML](https://ko.wikipedia.org/wiki/HTML) (또는 [XHTML](https://ko.wikipedia.org/wiki/XHTML)) 과 [CSS](https://ko.wikipedia.org/wiki/CSS)
  * 동적인 화면 출력 및 표시 정보와의 상호작용을 위한 [DOM](https://ko.wikipedia.org/wiki/DOM), [자바스크립트](https://ko.wikipedia.org/wiki/자바스크립트)
  * 웹 서버와 비동기적으로 데이터를 교환하고 조작하기 위한 [XML](https://ko.wikipedia.org/wiki/XML), [XSLT](https://ko.wikipedia.org/wiki/XSLT), [XMLHttpRequest](https://ko.wikipedia.org/wiki/XMLHttpRequest) (Ajax 애플리케이션은 XML/XSLT 대신 미리 정의된 HTML이나 일반 텍스트, [JSON](https://ko.wikipedia.org/wiki/JSON), [JSON-RPC](https://ko.wikipedia.org/wiki/JSON-RPC)를 이용할 수 있다).

![html](D:\Node.js Study\Nodejs(3)\img\3.PNG)

* Reflow? - 모든 엘리먼트의 위치와 길이를 다시 계산하는것 [참고자료1](https://mobicon.tistory.com/120) [참고자료2](https://webclub.tistory.com/346) [참고자료3](https://wonism.github.io/reflow-repaint/)

Ajax는 브라우저에서 **필요한 데이터만** 웹 서버에 요청한 후 **브라우저에서 데이터를 처리**하는 방식입니다.

응답을 처리하기 위해 브라우저는 **Javascript를 사용**합니다.

이 기법을 사용하면 서버에서 전척으로 처리되던 데이터 처리의 일부분이 브라우저 쪽에서 처리해 서버와 브라우저 사이에서 교환되는 데이터와 대역폭이 줄어들어 애플리케이션의 응답성이 좋아지고 결과적으로 웹 서버의 처리량도 줄어들게 됩니다.

## 6. 마치며

효율적인 웹 페이지 개발을 위해 동적페이지를 구현하는 방법에 대해 알아봤습니다

다음엔 Rest와 Ajax를 통해 동적 웹 페이지를 구현해보겠습니다.

